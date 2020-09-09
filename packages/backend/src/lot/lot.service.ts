import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LotEntity } from "./lot.entity";
import { CreateLotDto, LotDto, ReorderLotDto, UpdateLotDto, UpdateLotStatusDto } from "@airlab/shared/lib/lot/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { LotStatus } from "@airlab/shared/lib/lot/LotStatus";
import { UserEntity } from "../user/user.entity";

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
      status: LotStatus.Requested,
      requestedBy: params.createdBy,
      requestedAt: now,
      updatedAt: now,
    });
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("lot")
      .where({ id: id })
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .leftJoin("lot.requestedByMember", "requestedByMember")
      .leftJoinAndMapOne(
        "lot.requestedByUser",
        UserEntity,
        "requestedByUser",
        "requestedByMember.userId = requestedByUser.id"
      )
      .leftJoin("lot.approvedByMember", "approvedByMember")
      .leftJoinAndMapOne(
        "lot.approvedByUser",
        UserEntity,
        "approvedByUser",
        "approvedByMember.userId = approvedByUser.id"
      )
      .leftJoin("lot.orderedByMember", "orderedByMember")
      .leftJoinAndMapOne("lot.orderedByUser", UserEntity, "orderedByUser", "orderedByMember.userId = orderedByUser.id")
      .leftJoin("lot.receivedByMember", "receivedByMember")
      .leftJoinAndMapOne(
        "lot.receivedByUser",
        UserEntity,
        "receivedByUser",
        "receivedByMember.userId = receivedByUser.id"
      )
      .leftJoin("lot.finishedByMember", "finishedByMember")
      .leftJoinAndMapOne(
        "lot.finishedByUser",
        UserEntity,
        "finishedByUser",
        "finishedByMember.userId = finishedByUser.id"
      )
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
    let data = {};
    switch (params.status) {
      case LotStatus.Requested:
        data = {
          status: params.status,
          requestedBy: memberId,
          requestedAt: now,
          updatedAt: now,
        };
        break;
      case LotStatus.Approved:
        data = {
          status: params.status,
          approvedBy: memberId,
          approvedAt: now,
          updatedAt: now,
        };
        break;
      case LotStatus.Rejected:
        data = {
          status: params.status,
          updatedAt: now,
        };
        break;
      case LotStatus.Ordered:
        data = {
          status: params.status,
          orderedBy: memberId,
          orderedAt: now,
          updatedAt: now,
        };
        break;
      case LotStatus.Stock:
        data = {
          status: params.status,
          number: params.lotNumber,
          receivedBy: memberId,
          receivedAt: now,
          updatedAt: now,
        };
        break;
      case LotStatus.Low:
        data = {
          status: params.status,
          updatedAt: now,
        };
        break;
      case LotStatus.Finished:
        data = {
          status: params.status,
          finishedBy: memberId,
          finishedAt: now,
          updatedAt: now,
        };
        break;
    }
    await this.repository.update(id, data);
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async reorder(lot: LotDto, memberId: number, params: ReorderLotDto) {
    await this.clearCache(lot.groupId);
    const now = new Date().toISOString();
    const data: any = {
      ...lot,
      number: "Pending",
      purpose: params.purpose,
      status: LotStatus.Requested,
      requestedBy: memberId,
      requestedAt: now,
      approvedBy: null,
      approvedAt: null,
      orderedBy: null,
      orderedAt: null,
      receivedBy: null,
      receivedAt: null,
      finishedBy: null,
      finishedAt: null,
      updatedAt: now,
    };
    delete data.id;
    return this.repository.save(data);
  }

  async getGroupLots(groupId: number, query) {
    const select = this.repository
      .createQueryBuilder("lot")
      .where("lot.groupId = :groupId", { groupId: groupId })
      .andWhere("lot.isArchived = false")
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("lot.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .orderBy("lot.id", "DESC");
    return Object.keys(query).length === 0
      ? select.cache(`group_${groupId}_lots`, 1000 * 60 * 60).getMany()
      : select
          .andWhere("lot.status = :status", { status: Number(query.status) })
          .limit(Number(query.limit))
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

  async exportGroupLots(groupId: number) {
    return this.repository.find({
      select: [
        "id",
        "groupId",
        "createdBy",
        "cloneId",
        "providerId",
        "name",
        "reference",
        "requestedBy",
        "approvedBy",
        "orderedBy",
        "receivedBy",
        "finishedBy",
        "number",
        "status",
        "purpose",
        "url",
        "price",
        "note",
        "requestedAt",
        "approvedAt",
        "orderedAt",
        "receivedAt",
        "finishedAt",
        "isArchived",
        "meta",
        "createdAt",
        "updatedAt",
      ],
      where: {
        groupId: groupId,
      },
      order: {
        id: "ASC",
      },
    });
  }

  private async clearCache(groupId: number) {
    await Promise.all([
      this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_lots`]),
      this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_conjugates`]),
    ]);
  }
}
