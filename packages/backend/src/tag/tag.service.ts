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
    return this.repository.find();
  }

  async create(params: CreateTagDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateTagDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: number) {
    return this.repository.delete(id);
  }
}
