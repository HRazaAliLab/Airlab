import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanelEntity } from "./panel.entity";
import { CreatePanelDto, UpdatePanelDto } from "./panel.dto";

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
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllPanelsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        isDeleted: null,
      },
      order: {
        id: "DESC",
      },
    });
  }

  async getAllPanelsForUser(userId: number) {
    return this.repository.find({
      where: {
        createdBy: userId,
        isDeleted: null,
      },
      order: {
        id: "DESC",
      },
    });
  }
}
