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
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_tags`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "name", "mw", "isFluorophore", "isMetal"],
    });
  }

  async update(id: number, params: UpdateTagDto) {
    await this.repository.update(id, params);
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_tags`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_tags`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupTags(groupId: number) {
    return this.repository.find({
      select: ["id", "name", "mw", "isFluorophore", "isMetal"],
      where: {
        groupId: groupId,
      },
      order: {
        mw: "ASC",
      },
      cache: {
        id: `group_${groupId}_tags`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }
}
