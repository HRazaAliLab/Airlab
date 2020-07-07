import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberEntity } from "./member.entity";
import { CreateMemberDto, UpdateMemberDto } from "@airlab/shared/lib/member/dto";

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>
  ) {}

  async create(params: CreateMemberDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "role", "isActive", "allPanels"],
    });
  }

  async update(id: number, params: UpdateMemberDto) {
    await this.repository.update(id, params);
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async checkRequest(userId: number, groupId: number) {
    const count = await this.repository.count({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    return count > 0;
  }

  async createJoinRequest(userId: number, groupId: number) {
    await this.clearCache(groupId);
    return this.repository.save({
      groupId: groupId,
      userId: userId,
      isActive: false,
      role: -1,
    });
  }

  async findByUserIdAndGroupId(userId: number, groupId: number) {
    return this.repository.findOne({
      groupId: groupId,
      userId: userId,
    });
  }

  async findByUserId(userId: number) {
    return this.repository.find({
      userId: userId,
    });
  }

  async checkMemberPermissions(userId: number, groupId: number) {
    const member = await this.findByUserIdAndGroupId(userId, groupId);
    if (!member || !member.isActive) {
      throw new UnauthorizedException();
    }
    return member;
  }

  async getGroupMembers(groupId: number) {
    return this.repository
      .createQueryBuilder("member")
      .select(["member.id", "member.role", "member.isActive", "member.allPanels"])
      .where("member.groupId = :groupId", { groupId: groupId })
      .leftJoin("member.user", "user")
      .addSelect(["user.id", "user.name", "user.email"])
      .orderBy("member.id", "DESC")
      .cache(`group_${groupId}_members`, 1000 * 60 * 60)
      .getMany();
  }

  async exportGroupMembers(groupId: number) {
    return this.repository
      .createQueryBuilder("member")
      .select([
        "member.id",
        "member.groupId",
        "member.userId",
        "member.role",
        "member.isActive",
        "member.allPanels",
        "member.activationKey",
        "member.createdAt",
        "member.updatedAt",
      ])
      .where("member.groupId = :groupId", { groupId: groupId })
      .orderBy("member.id", "ASC")
      .getMany();
  }

  private async clearCache(groupId: number) {
    await Promise.all([
      this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_members`]),
      this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_panels`]),
      this.repository.manager.connection.queryResultCache.remove([`groups`]),
    ]);
  }
}
