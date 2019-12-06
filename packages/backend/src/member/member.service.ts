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
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_members`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "role", "isActive", "canOrder", "canErase", "canFinances", "canPanels"],
    });
  }

  async update(id: number, params: UpdateMemberDto) {
    await this.repository.update(id, params);
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_members`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_members`]);
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
      .select([
        "member.id",
        "member.role",
        "member.isActive",
        "member.canOrder",
        "member.canErase",
        "member.canFinances",
        "member.canPanels",
      ])
      .where("member.groupId = :groupId", { groupId: groupId })
      .leftJoin("member.user", "user")
      .addSelect(["user.id", "user.name", "user.email"])
      .orderBy("member.id", "DESC")
      .cache(`group_${groupId}_members`, 1000 * 60 * 60)
      .getMany();
  }
}