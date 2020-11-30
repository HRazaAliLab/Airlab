import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidationFileEntity } from "./validationFile.entity";
import { CreateValidationFileDto, UpdateValidationFileDto } from "@airlab/shared/lib/validationFile/dto";
import { Readable } from "stream";
import { promises as fsAsync } from "fs";

@Injectable()
export class ValidationFileService {
  constructor(
    @InjectRepository(ValidationFileEntity)
    private readonly repository: Repository<ValidationFileEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateValidationFileDto) {
    return this.repository.save(params);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async update(id: number, params: UpdateValidationFileDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      relations: ["validation"],
    });
  }

  async deleteById(id: number) {
    const file = await this.findById(id);
    if (file) {
      const dir = `/data/groups/${file.validation.groupId}/uploads/validation/${file.validation.id}`;
      const path = `${dir}/${file.hash}.${file.extension}`;
      await fsAsync.unlink(path);
    }
    const result = await this.repository.delete(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${file.validation.groupId}_validations`]);
    return result.affected === 1 ? id : undefined;
  }

  async getAllFilesForMember(memberId: number) {
    return this.repository.find({
      where: {
        createdBy: memberId,
      },
    });
  }

  async getFileHash(fileId: number) {
    return this.repository.find({
      select: ["hash", "extension"],
      where: {
        id: fileId,
      },
    });
  }

  async getFileBuffer(path: string): Promise<Buffer> {
    const content = await fsAsync.readFile(path);
    return content;
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async exportValidationFiles(groupId?: number) {
    let query = this.repository
      .createQueryBuilder("validationFile")
      .leftJoin("validationFile.validation", "validation")
      .addSelect(["validation.groupId"]);

    if (groupId) {
      query = query.where("validation.groupId = :groupId", { groupId: groupId });
    }

    return query.orderBy("validationFile.id", "ASC").getMany();
  }
}
