import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanelEntity } from "./panel.entity";
import { CreatePanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelEntity)
    private readonly repository: Repository<PanelEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreatePanelDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePanelDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllPanelsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        deleted: false,
      },
      order: {
        id: "DESC",
      },
    });
  }

  async getAllPanelsForGroupUser(groupUserId: number) {
    return this.repository.find({
      where: {
        createdBy: groupUserId,
        deleted: false,
      },
      order: {
        id: "DESC",
      },
    });
  }
}
