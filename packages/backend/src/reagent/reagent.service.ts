import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReagentEntity } from "./reagent.entity";
import { CreateReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ReagentService {
  constructor(
    @InjectRepository(ReagentEntity)
    private readonly repository: Repository<ReagentEntity>
  ) {}

  async create(params: CreateReagentDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateReagentDto) {
    await this.repository.update(id, params);
    return this.findById(id);
    // return this.repository
    //   .createQueryBuilder()
    //   .update()
    //   .set(params)
    //   .where("id = :id", { id: id })
    //   .returning("*")
    //   .execute();
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name", "reference", "providerId", "meta"],
    });
  }

  async getAllReagentsForGroup(groupId: number) {
    const result = await this.repository
      .createQueryBuilder("reagent")
      .select(["reagent.id", "reagent.name", "reagent.reference", "reagent.meta"])
      .leftJoin("reagent.provider", "provider")
      .addSelect(["provider.id", "provider.name"])
      .leftJoin("reagent.groupUser", "groupUser")
      .leftJoinAndMapOne("reagent.user", UserEntity, "user", "groupUser.userId = user.id")
      .where({
        groupId: groupId,
        isDeleted: false,
      })
      .orderBy("reagent.id", "DESC")
      .getMany();
    return result;
  }
}
