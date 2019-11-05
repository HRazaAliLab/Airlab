import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { ReagentInstanceEntity } from "./reagentInstance.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { CreateReagentInstanceDto, UpdateReagentInstanceDto } from "@airlab/shared/lib/reagentInstance/dto";

@Injectable()
export class ReagentInstanceService {
  constructor(
    @InjectRepository(ReagentInstanceEntity)
    private readonly reagentInstanceRepository: Repository<ReagentInstanceEntity>
  ) {}

  async findAll() {
    return this.reagentInstanceRepository.find();
  }

  async create(params: CreateReagentInstanceDto) {
    return this.reagentInstanceRepository.save(params);
  }

  async update(id: number, params: UpdateReagentInstanceDto) {
    await this.reagentInstanceRepository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.reagentInstanceRepository.findOne(id);
  }

  async getAllReagentInstancesForGroup(groupId: number) {
    return this.reagentInstanceRepository.find({
      where: {
        groupId: groupId,
        lotCloneId: 0,
        deleted: Not(1),
      },
    });
  }

  async getAllReagentInstancesWithLotsForGroup(groupId: number) {
    return this.reagentInstanceRepository.find({
      where: {
        groupId: groupId,
        deleted: Not(1),
      },
    });
  }

  async getAllLotsForGroup(userId: number) {
    return this.reagentInstanceRepository
      .createQueryBuilder("reagent")
      .leftJoin(GroupUserEntity, "groupUser", "reagent.groupId = groupUser.groupId")
      .where("groupUser.userId = :userId", { userId: userId })
      .andWhere("reagent.lotCloneId != 0")
      .andWhere("reagent.deleted = 0")
      .getMany();
  }
}
