import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlateWellEntity } from "./plateWell.entity";
import { CreatePlateWellDto, UpdatePlateWellDto } from "./plateWell.dto";

@Injectable()
export class PlateWellService {
  constructor(
    @InjectRepository(PlateWellEntity)
    private readonly repository: Repository<PlateWellEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreatePlateWellDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePlateWellDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllPlateWellsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllPlateWellsForGroupUser(groupUserId: number) {
    return this.repository.find({
      where: {
        createdBy: groupUserId,
      },
    });
  }
}
