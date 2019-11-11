import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReagentEntity } from "./reagent.entity";
import { CreateReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ReagentService {
  constructor(
    @InjectRepository(ReagentEntity)
    private readonly repository: Repository<ReagentEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateReagentDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateReagentDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllReagentsForGroup(groupId: number) {
    // const result = await this.repository.find({
    //   relations: ["groupUser", "provider"],
    //   where: {
    //     groupId: groupId,
    //     isDeleted: false,
    //   },
    // });
    const result = await this.repository
      .createQueryBuilder("reagent")
      .leftJoin("reagent.provider", "provider")
      .addSelect(["provider.name"])
      .leftJoin("reagent.groupUser", "groupUser")
      .leftJoin("groupUser.user", "user")
      .addSelect(["user.name"])
      .where({
        groupId: groupId,
        isDeleted: false,
      })
      .getMany();
    return result;
  }
}
