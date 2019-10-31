import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EnsayoEntity } from "./ensayo.entity";
import { CreateEnsayoDto, UpdateEnsayoDto } from "./ensayo.dto";

@Injectable()
export class EnsayoService {
  constructor(
    @InjectRepository(EnsayoEntity)
    private readonly repository: Repository<EnsayoEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateEnsayoDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateEnsayoDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllEnsayosForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllEnsayosForUserGroup(userGroupId: number) {
    return this.repository.find({
      where: {
        createdBy: userGroupId,
      },
    });
  }

  async getAllEnsayosSharedForUserGroup(userGroupId: number) {
    return this.repository.find({
      where: {
        createdBy: userGroupId,
      },
    });
  }

  async canSeeExperiment(experimentId: number, groupId: number) {
    return this.repository.find({
      where: {
        id: experimentId,
        groupId: groupId,
      },
    });
  }
}
