import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CloneEntity } from "./clone.entity";
import { CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Injectable()
export class CloneService {
  constructor(
    @InjectRepository(CloneEntity)
    private readonly repository: Repository<CloneEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateCloneDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateCloneDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getAllClonesForGroupsWithProteinName(userId: number) {
    const result = await this.repository
      .createQueryBuilder("clone")
      .leftJoinAndSelect("clone.protein", "protein")
      .leftJoinAndSelect("clone.hostSpecies", "hostSpecies")
      .leftJoin(GroupUserEntity, "groupUser", "clone.groupId = groupUser.groupId")
      .where("groupUser.userId = :userId", { userId: userId })
      .andWhere("clone.deleted IS NULL")
      .getMany();
    return result;
  }
}
