import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupEntity } from "./group.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import * as crypto from "crypto";
import { CreateGroupDto, InviteDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
import { UserEntity } from "../user/user.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

const privateKey = "fsdfC987XXasdf979werl$#";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly groupUserService: GroupUserService
  ) {}

  async create(params: CreateGroupDto) {
    await this.groupRepository.manager.connection.queryResultCache.remove([`groups`]);
    return this.groupRepository.save(params);
  }

  async findById(id: number) {
    return this.groupRepository.findOne(id);
  }

  async update(id: number, params: UpdateGroupDto) {
    await this.groupRepository.update(id, params);
    await this.groupRepository.manager.connection.queryResultCache.remove([`groups`]);
    return this.findById(id);
  }

  async deleteById(id: number) {
    await this.groupRepository.manager.connection.queryResultCache.remove([`groups`]);
    const result = await this.groupRepository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async findAll() {
    return this.groupRepository.find({
      relations: ["groupUsers", "groupUsers.group", "groupUsers.user"],
      order: { id: "DESC" },
      cache: {
        id: `groups`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }

  async requestJoinGroup(userId: number, groupId: number) {
    const group = await this.findById(groupId);
    if (!group) {
      throw new NotFoundException("Group not found");
    }
    if (group.isOpen) {
      const requestExists = await this.groupUserService.checkRequest(userId, groupId);
      if (!requestExists) {
        await this.groupUserService.createJoinRequest(userId, groupId);
        return true;
      }
    }
    return false;
  }

  async invite(params: InviteDto) {
    if (!this.checkPublicKey(params.token, params.userId)) {
      return;
    }
  }

  private checkPublicKey(publicKey: string, userId: number) {
    const compound = `${userId}${privateKey}${userId}`;
    const hash = crypto
      .createHash("sha1")
      .update(compound)
      .digest("hex");
    return publicKey === hash;
  }

  async getUsersInGroup(groupId: number) {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoin(GroupUserEntity, "groupUser", "user.id = groupUser.userId")
      .where("groupUser.groupId = :groupId", { groupId: groupId })
      .getMany();
  }
}
