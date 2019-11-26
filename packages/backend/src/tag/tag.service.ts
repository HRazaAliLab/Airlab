import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagEntity } from "./tag.entity";
import { CreateTagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>
  ) {}

  async findAll() {
    return this.repository.find({
      select: ["id", "name", "mw", "isFluorophore", "isMetal"],
      order: {
        mw: "ASC",
      },
    });
  }

  async create(params: CreateTagDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateTagDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name", "mw", "isFluorophore", "isMetal"],
    });
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }
}
