import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanelEntity } from "./panel.entity";
import { CreatePanelDto, DuplicatePanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { UserEntity } from "../user/user.entity";
import { PanelElementService } from "../panelElement/panelElement.service";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelEntity)
    private readonly repository: Repository<PanelEntity>,
    private readonly panelElementService: PanelElementService
  ) {}

  async create(params: CreatePanelDto) {
    await this.clearCache(params.groupId);
    const item = await this.repository.save(params);
    await this.panelElementService.updatePanelElements(item.id, params.elements);
    await this.clearCache(params.groupId);
    return this.findById(item.id);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("panel")
      .where({
        id: id,
      })
      .leftJoin("panel.member", "member")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "member.userId = user.id")
      .leftJoin("panel.elements", "elements")
      .addSelect(["elements.conjugateId", "elements.dilutionType", "elements.concentration"])
      .getOne();
  }

  async update(id: number, params: UpdatePanelDto) {
    const elements = params.elements.map((item) => {
      return { ...item };
    });
    delete params.elements;
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    await this.panelElementService.updatePanelElements(id, elements);
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

  async duplicate(id: number, params: DuplicatePanelDto) {
    const item = await this.findById(id);
    const elements = item.elements.map((item) => {
      return { ...item };
    });
    delete item.id;
    delete item.elements;
    const newPanel = await this.repository.save({ ...item, name: params.name, createdBy: params.createdBy });
    await this.panelElementService.updatePanelElements(newPanel.id, elements);
    await this.clearCache(newPanel.groupId);
    return this.findById(newPanel.id);
  }

  async getGroupPanels(groupId: number) {
    return this.repository
      .createQueryBuilder("panel")
      .leftJoin("panel.member", "member")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "member.userId = user.id")
      .where({
        groupId: groupId,
        isArchived: false,
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
        isArchived: false,
      })
      .orderBy({ "panel.id": "DESC" })
      .getMany();
  }

  async getConjugatePanels(conjugateId: number) {
    return this.repository
      .createQueryBuilder("panel")
      .where({
        isArchived: false,
      })
      .leftJoin("panel.member", "member")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "member.userId = user.id")
      .leftJoin("panel.elements", "elements")
      .andWhere("elements.conjugateId = :conjugateId", { conjugateId: conjugateId })
      .orderBy({ "panel.id": "DESC" })
      .getMany();
  }

  async exportPanels(groupId?: number) {
    return groupId
      ? this.repository.find({
          select: [
            "id",
            "groupId",
            "createdBy",
            "name",
            "description",
            "isFluorophore",
            "isLocked",
            "application",
            "meta",
            "isArchived",
            "createdAt",
            "updatedAt",
          ],
          where: {
            groupId: groupId,
          },
          order: {
            id: "ASC",
          },
        })
      : this.repository.find({
          select: [
            "id",
            "groupId",
            "createdBy",
            "name",
            "description",
            "isFluorophore",
            "isLocked",
            "application",
            "meta",
            "isArchived",
            "createdAt",
            "updatedAt",
          ],
          order: {
            id: "ASC",
          },
        });
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_panels`]);
  }
}
