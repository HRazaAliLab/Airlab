import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdatePasswordDto, UpdateProfileDto, UpdateUserDto } from "@airlab/shared/lib/user/dto";
import { getPasswordHash } from "../auth/helpers";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(params: CreateUserDto) {
    const passwordHash = await getPasswordHash(params.password);
    await this.clearCache();
    return this.repository.save({ ...params, password: passwordHash, isActive: true });
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name", "email", "isActive", "isAdmin", "meta", "createdAt", "updatedAt"],
    });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      select: ["id", "email", "password", "name", "isActive", "isAdmin"],
      where: { email: email },
    });
  }

  async update(id: number, params: UpdateUserDto | UpdateProfileDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    await this.clearCache();
    return this.findById(id);
  }

  async updatePassword(id: number, params: UpdatePasswordDto) {
    const passwordHash = await getPasswordHash(params.password);
    await this.repository.update(id, { password: passwordHash, updatedAt: new Date().toISOString() });
    await this.clearCache();
    return this.findById(id);
  }

  async deleteById(id: number) {
    await this.clearCache();
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async findAll() {
    return this.repository.find({
      select: ["id", "name", "email", "isActive", "isAdmin", "meta", "createdAt", "updatedAt"],
      order: {
        id: "DESC",
      },
      cache: {
        id: `users`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }

  async exportGroupUsers(groupId: number) {
    return this.repository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.password",
        "user.email",
        "user.isActive",
        "user.isAdmin",
        "user.meta",
        "user.createdAt",
        "user.updatedAt",
      ])
      .leftJoin("user.members", "members")
      .where("members.groupId = :groupId", { groupId: groupId })
      .orderBy("user.id", "ASC")
      .getMany();
  }

  private async clearCache() {
    await this.repository.manager.connection.queryResultCache.remove([`users`]);
  }
}
