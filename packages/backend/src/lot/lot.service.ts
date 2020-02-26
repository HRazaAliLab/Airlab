import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LotEntity } from "./lot.entity";
import { CreateLotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(LotEntity)
    private readonly repository: Repository<LotEntity>
  ) {}

  async create(params: CreateLotDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, params: UpdateLotDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
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

  async getGroupLots(groupId: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where("lot.groupId = :groupId", { groupId: groupId })
      .andWhere("lot.isDeleted = false")
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .orderBy("lot.id", "DESC")
      .cache(`group_${groupId}_lots`, 1000 * 60 * 60)
      .getMany();
  }

  async getCloneLots(cloneId: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where("lot.cloneId = :cloneId", { cloneId: cloneId })
      .andWhere("lot.isDeleted = false")
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .orderBy("lot.id", "DESC")
      .getMany();
  }

  async getProviderLots(providerId: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where("lot.providerId = :providerId", { providerId: providerId })
      .andWhere("lot.isDeleted = false")
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .orderBy("lot.id", "DESC")
      .getMany();
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_lots`]);
  }
}
