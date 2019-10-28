import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlateEntity } from "./plate.entity";
import { CreatePlateDto, UpdatePlateDto } from "./plate.dto";

@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(PlateEntity)
    private readonly repository: Repository<PlateEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreatePlateDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePlateDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllPlatesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllPlatesForUserGroup(userGroupId: number) {
    return this.repository.find({
      where: {
        createdBy: userGroupId,
      },
    });
  }
}
