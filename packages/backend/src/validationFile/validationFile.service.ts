import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidationFileEntity } from "./validationFile.entity";
import { CreateValidationFileDto, UpdateValidationFileDto } from "@airlab/shared/lib/validationFile/dto";
import { Readable } from "stream";
const fs = require("fs").promises;

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
      await fs.unlink(path);
    }
    const result = await this.repository.delete(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${file.validation.groupId}_validations`]);
    return result.affected === 1 ? id : undefined;
  }

  async exportGroupValidationFiles(groupId: number) {
    return this.repository
      .createQueryBuilder("validationFile")
      .leftJoin("validationFile.validation", "validation")
      .where("validation.groupId = :groupId", { groupId: groupId })
      .orderBy("validationFile.id", "ASC")
      .getMany();
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
    const content = await fs.readFile(path);
    return content;
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
