import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderEntity } from "./provider.entity";
import { CreateProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly repository: Repository<ProviderEntity>
  ) {}

  async create(params: CreateProviderDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "name", "description", "url", "createdAt"],
    });
  }

  async update(id: number, params: UpdateProviderDto) {
    await this.repository.update(id, params);
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupProviders(groupId: number) {
    return this.repository.find({
      select: ["id", "name"],
      where: {
        groupId: groupId,
      },
      order: {
        id: "DESC",
      },
      cache: {
        id: `group_${groupId}_providers`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }

  async exportProviders(groupId?: number) {
    return groupId
      ? this.repository.find({
          select: ["id", "groupId", "name", "description", "url", "meta", "createdAt"],
          where: {
            groupId: groupId,
          },
          order: {
            id: "ASC",
          },
        })
      : this.repository.find({
          select: ["id", "groupId", "name", "description", "url", "meta", "createdAt"],
          order: {
            id: "ASC",
          },
        });
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_providers`]);
  }
}
