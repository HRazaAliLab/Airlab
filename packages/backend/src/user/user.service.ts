import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from "@airlab/shared/lib/user/dto";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(GroupUserEntity)
    private readonly groupUserRepository: Repository<GroupUserEntity>
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async create(params: CreateUserDto) {
    return this.userRepository.save(params);
  }

  async update(id: number, params: UpdateUserDto | UpdateProfileDto) {
    await this.userRepository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async getGroupsForUser(userId: number) {
    // return this.groupUserRepository.find({
    //   where: { userId: userId },
    //   relations: ["group"],
    // });
    return this.groupRepository
      .createQueryBuilder("group")
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select("groupUser.groupId", "groupId")
          .from(GroupUserEntity, "groupUser")
          .where("groupUser.userId = :userId")
          .getQuery();
        return "group.grpGroupId IN " + subQuery;
      })
      .setParameter("userId", userId)
      .getMany();
  }
}
