import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LotEntity } from "./lot.entity";
import { CreateLotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(LotEntity)
    private readonly repository: Repository<LotEntity>
  ) {}

  async create(params: CreateLotDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateLotDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupLots(groupId: number) {
    return (
      this.repository
        .createQueryBuilder("lot")
        .where("lot.groupId = :groupId", { groupId: groupId })
        .andWhere("lot.isDeleted = false")
        .leftJoin("lot.clone", "clone")
        .addSelect(["clone.id", "clone.name"])
        .leftJoin("lot.reagent", "reagent")
        .addSelect(["reagent.id", "reagent.name"])
        .orderBy("lot.id", "DESC")
        // .cache("group_lots", 1000 * 60 * 60)
        .getMany()
    );
  }
}
