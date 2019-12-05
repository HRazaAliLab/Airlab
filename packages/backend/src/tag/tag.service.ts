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

  async create(params: CreateTagDto) {
    await this.repository.manager.connection.queryResultCache.remove(["tags"]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "name", "mw", "isFluorophore", "isMetal"],
    });
  }

  async update(id: number, params: UpdateTagDto) {
    await this.repository.update(id, params);
    await this.repository.manager.connection.queryResultCache.remove(["tags"]);
    return this.findById(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    await this.repository.manager.connection.queryResultCache.remove(["tags"]);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupTags(groupId: number) {
    return this.repository.find({
      select: ["id", "groupId", "name", "mw", "isFluorophore", "isMetal"],
      where: {
        groupId: groupId,
      },
      order: {
        mw: "ASC",
      },
      cache: {
        id: "tags",
        milliseconds: 1000 * 60 * 60,
      },
    });
  }
}
