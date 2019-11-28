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

  async findAll() {
    return this.repository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async create(params: CreatePanelDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePanelDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async duplicate(id: number, params: DuplicatePanelDto) {
    const item = await this.findById(id);
    delete item.id;
    return this.repository.save({ ...item, name: params.name, createdBy: params.createdBy });
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getAllPanelsForGroup(groupId: number) {
    const result = await this.repository
      .createQueryBuilder("panel")
      .leftJoin("panel.groupUser", "groupUser")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "groupUser.userId = user.id")
      .where({
        groupId: groupId,
        isDeleted: false,
      })
      .orderBy({ "panel.id": "DESC" })
      .getMany();
    return result;
  }

  async getAllPanelsForGroupUser(groupUserId: number) {
    const result = await this.repository
      .createQueryBuilder("panel")
      .leftJoin("panel.groupUser", "groupUser")
      .leftJoinAndMapOne("panel.user", UserEntity, "user", "groupUser.userId = user.id")
      .where({
        createdBy: groupUserId,
        isDeleted: false,
      })
      .orderBy({ "panel.id": "DESC" })
      .getMany();
    return result;
  }
}
