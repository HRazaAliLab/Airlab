import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidationFileEntity } from "./validationFile.entity";
import { CreateValidationFileDto, UpdateValidationFileDto } from "@airlab/shared/lib/validationFile/dto";

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
    return this.repository.findOne(id);
  }

  async getAllFilesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllFilesForGroupUser(groupUserId: number) {
    return this.repository.find({
      where: {
        createdBy: groupUserId,
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
}
