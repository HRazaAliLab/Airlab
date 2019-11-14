import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from "@airlab/shared/lib/user/dto";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { LotEntity } from "../lot/lot.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(GroupUserEntity)
    private readonly groupUserRepository: Repository<GroupUserEntity>,
    @InjectRepository(LotEntity)
    private readonly lotRepository: Repository<LotEntity>
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async create(params: CreateUserDto) {
    return this.userRepository.save(params);
  }

  async update(id: number, params: UpdateUserDto | UpdateProfileDto) {
    await this.userRepository.update(id, { ...params, updatedAt: new Date().toISOString() });
    return this.findById(id);
  }

  async findById(id: number) {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      select: ["id", "email", "password"],
      where: { email: email },
    });
  }

  async findByActivationKey(key: string) {
    return this.userRepository.findOne({
      where: { activationKey: key },
    });
  }

  async getGroupsForUser(userId: number) {
    return this.groupRepository
      .createQueryBuilder("group")
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select("groupUser.groupId", "groupId")
          .from(GroupUserEntity, "groupUser")
          .where("groupUser.userId = :userId", { userId: userId })
          .getQuery();
        return "group.id IN " + subQuery;
      })
      .getMany();
  }

  async activate(key: string) {
    await this.userRepository.update(
      {
        activationKey: key,
      },
      {
        isActive: true,
      }
    );
    return this.findByActivationKey(key);
  }

  async getAllLotsForUser(userId: number) {
    return this.lotRepository
      .createQueryBuilder("lot")
      .leftJoin(GroupUserEntity, "groupUser", "lot.groupId = groupUser.groupId")
      .where("groupUser.userId = :userId", { userId: userId })
      .andWhere("lot.cloneId != 0")
      .andWhere("lot.isDeleted = false")
      .getMany();
  }
}
