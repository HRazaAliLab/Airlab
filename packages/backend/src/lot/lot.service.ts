import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LotEntity } from "./lot.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { CreateLotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(LotEntity)
    private readonly lotRepository: Repository<LotEntity>
  ) {}

  async findAll() {
    return this.lotRepository.find();
  }

  async create(params: CreateLotDto) {
    return this.lotRepository.save(params);
  }

  async update(id: number, params: UpdateLotDto) {
    await this.lotRepository.update(id, { ...params, updatedAt: new Date().toISOString() });
    return this.findById(id);
  }

  async findById(id: number) {
    return this.lotRepository.findOne(id);
  }

  async getAllReagentInstancesForGroup(groupId: number) {
    return this.lotRepository.find({
      where: {
        groupId: groupId,
        lotCloneId: 0,
        deleted: false,
      },
    });
  }

  async getAllReagentInstancesWithLotsForGroup(groupId: number) {
    return this.lotRepository.find({
      where: {
        groupId: groupId,
        deleted: false,
      },
    });
  }

  async getAllLotsForGroup(userId: number) {
    return this.lotRepository
      .createQueryBuilder("lot")
      .leftJoin(GroupUserEntity, "groupUser", "lot.groupId = groupUser.groupId")
      .where("groupUser.userId = :userId", { userId: userId })
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("lot.reagent", "reagent")
      .addSelect(["reagent.id", "reagent.name"])
      .andWhere("lot.isDeleted = false")
      .orderBy("lot.id", "DESC")
      .getMany();
  }
}
