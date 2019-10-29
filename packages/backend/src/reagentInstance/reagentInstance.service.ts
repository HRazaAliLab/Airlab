import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { ReagentInstanceEntity } from "./reagentInstance.entity";
import { CreateReagentInstanceDto, UpdateReagentInstanceDto } from "./reagentInstance.dto";

@Injectable()
export class ReagentInstanceService {
  constructor(
    @InjectRepository(ReagentInstanceEntity)
    private readonly repository: Repository<ReagentInstanceEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateReagentInstanceDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateReagentInstanceDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllReagentInstancesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        lotCloneId: 0,
        isDeleted: Not(1),
      },
    });
  }

  async getAllReagentInstancesWithLotsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        isDeleted: Not(1),
      },
    });
  }
}
