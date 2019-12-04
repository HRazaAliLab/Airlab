import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupUserEntity } from "./groupUser.entity";

@Injectable()
export class GroupUserService {
  constructor(
    @InjectRepository(GroupUserEntity)
    private readonly groupUserRepository: Repository<GroupUserEntity>
  ) {}

  async checkRequest(userId: number, groupId: number) {
    const count = await this.groupUserRepository.count({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    return count > 0;
  }

  async createJoinRequest(userId: number, groupId: number) {
    return this.groupUserRepository.save({
      groupId: groupId,
      userId: userId,
      isActive: false,
      role: -1,
    });
  }

  async findByUserIdAndGroupId(userId: number, groupId: number) {
    return this.groupUserRepository.findOne({
      groupId: groupId,
      userId: userId,
    });
  }

  async findByUserId(userId: number) {
    return this.groupUserRepository.find({
      userId: userId,
    });
  }
}
