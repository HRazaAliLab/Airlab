import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupEntity } from "./group.entity";
import { CreateGroupDto, InviteDto } from "./group.dto";
import { GroupUserService } from "../groupUser/groupUser.service";
import * as crypto from "crypto";

const privateKey = "fsdfC987XXasdf979werl$#";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly groupUserService: GroupUserService
  ) {}

  async findAll() {
    return this.groupRepository.find();
  }

  async create(params: CreateGroupDto) {
    return this.groupRepository.save(params);
  }

  async checkLabAcceptsRequests(id: number) {
    const count = await this.groupRepository.count({
      where: {
        id: id,
        acceptRequests: true,
      },
    });
    return count > 0;
  }

  async findById(id: number) {
    return this.groupRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async requestJoinGroup(userId: number, groupId: number) {
    const group = await this.findById(groupId);
    if (!group) {
      throw new NotFoundException("Group not found");
    }
    if (group.acceptRequests) {
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
}
