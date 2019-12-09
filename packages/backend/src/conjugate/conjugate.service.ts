import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ConjugateService {
  constructor(
    @InjectRepository(ConjugateEntity)
    private readonly repository: Repository<ConjugateEntity>
  ) {}

  async create(params: CreateConjugateDto) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_conjugates`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, params: UpdateConjugateDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_conjugates`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_conjugates`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupConjugates(groupId: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where("conjugate.groupId = :groupId", { groupId: groupId })
      .andWhere("conjugate.isDeleted = false")
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.name"])
      .leftJoin("conjugate.member", "member")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "member.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .cache(`group_${groupId}_conjugates`, 1000 * 60 * 60)
      .getMany();
  }

  async getLotConjugates(lotId: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where("conjugate.lotId = :lotId", { lotId: lotId })
      .andWhere("conjugate.isDeleted = false")
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.name"])
      .leftJoin("conjugate.member", "member")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "member.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .getMany();
  }

  async lastConjugateForGroup(groupId: number) {
    const entity = await this.repository.findOne({
      select: ["tubeNumber"],
      where: {
        groupId: groupId,
      },
      order: {
        tubeNumber: "DESC",
      },
    });
    return entity.tubeNumber + 1;
  }
}
