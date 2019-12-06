import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanelEntity } from "./panel.entity";
import { CreatePanelDto, DuplicatePanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelEntity)
    private readonly repository: Repository<PanelEntity>
  ) {}

  async create(params: CreatePanelDto) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_panels`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, params: UpdatePanelDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_panels`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_panels`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async duplicate(id: number, params: DuplicatePanelDto) {
    const item = await this.findById(id);
    delete item.id;
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_panels`]);
    return this.repository.save({ ...item, name: params.name, createdBy: params.createdBy });
  }

  async getGroupPanels(groupId: number) {
    return this.repository
      .createQueryBuilder("panel")
      .leftJoin("panel.member", "member")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "member.userId = user.id")
      .where({
        groupId: groupId,
        isDeleted: false,
      })
      .orderBy({ "panel.id": "DESC" })
      .cache(`group_${groupId}_panels`, 1000 * 60 * 60)
      .getMany();
  }

  async getPersonalGroupPanels(groupId: number, memberId: number) {
    return this.repository
      .createQueryBuilder("panel")
      .leftJoin("panel.member", "member")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "member.userId = user.id")
      .where({
        groupId: groupId,
        createdBy: memberId,
        isDeleted: false,
      })
      .orderBy({ "panel.id": "DESC" })
      .getMany();
  }
}
