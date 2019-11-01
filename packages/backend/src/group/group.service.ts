import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupEntity } from "./group.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import * as crypto from "crypto";
import { UtilsService } from "../utils/utils.service";
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
    private readonly groupUserService: GroupUserService,
    private readonly utilsService: UtilsService
  ) {}

  async findAll() {
    // await this.utilsService.sendEmail("anton.rau@uzh.ch", "anton.rau@gmail.com", "Test", {
    //   body: {
    //     name: "John Appleseed",
    //     intro: "Welcome to Mailgen! We're very excited to have you on board.",
    //     action: {
    //       instructions: "To get started with Mailgen, please click here:",
    //       button: {
    //         color: "#22BC66", // Optional action button color
    //         text: "Confirm your account",
    //         link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
    //       },
    //     },
    //     outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    //   },
    // });
    return this.groupRepository.find({ relations: ["groupUsers", "groupUsers.group", "groupUsers.user"] });
  }

  async create(params: CreateGroupDto) {
    return this.groupRepository.save(params);
  }

  async update(id: number, params: UpdateGroupDto) {
    await this.groupRepository.update(id, params);
    return this.findById(id);
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
    return this.groupRepository.findOne(id);
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

  async getUsersInGroup(groupId: number) {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoin(GroupUserEntity, "groupUser", "user.id = groupUser.userId")
      .where("groupUser.groupId = :groupId", { groupId: groupId })
      .getMany();
  }
}
