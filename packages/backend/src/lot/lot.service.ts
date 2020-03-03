import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LotEntity } from "./lot.entity";
import { CreateLotDto, UpdateLotDto, UpdateLotStatusDto } from "@airlab/shared/lib/lot/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(LotEntity)
    private readonly repository: Repository<LotEntity>
  ) {}

  async create(params: CreateLotDto) {
    await this.clearCache(params.groupId);
    const now = new Date().toISOString();
    return this.repository.save({
      ...params,
      requestedBy: params.createdBy,
      requestedAt: now,
      updatedAt: now,
    });
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where({ id: id })
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .getOne();
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

  async updateArchiveState(id: number, params: UpdateStateDto) {
    await this.repository.update(id, { isArchived: params.state, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async updateStatus(id: number, memberId: number, params: UpdateLotStatusDto) {
    const now = new Date().toISOString();
    let values = {};
    switch (params.status) {
      case 0:
        values = {
          status: params.status,
          requestedBy: memberId,
          requestedAt: now,
          updatedAt: now,
        };
        break;
      case 1:
        values = {
          status: params.status,
          approvedBy: memberId,
          approvedAt: now,
          updatedAt: now,
        };
        break;
      case 2:
        values = {
          status: params.status,
          updatedAt: now,
        };
        break;
      case 3:
        values = {
          status: params.status,
          orderedBy: memberId,
          orderedAt: now,
          updatedAt: now,
        };
        break;
      case 4:
        values = {
          status: params.status,
          receivedBy: memberId,
          receivedAt: now,
          updatedAt: now,
        };
        break;
      case 5:
        values = {
          status: params.status,
          finishedBy: memberId,
          finishedAt: now,
          updatedAt: now,
        };
        break;
    }
    await this.repository.update(id, values);
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async getGroupLots(groupId: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where("lot.groupId = :groupId", { groupId: groupId })
      .andWhere("lot.isArchived = false")
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
      .andWhere("lot.isArchived = false")
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .orderBy("lot.id", "DESC")
      .getMany();
  }

  async getProviderLots(providerId: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where("lot.providerId = :providerId", { providerId: providerId })
      .andWhere("lot.isArchived = false")
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .orderBy("lot.id", "DESC")
      .getMany();
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_lots`]);
  }
}
