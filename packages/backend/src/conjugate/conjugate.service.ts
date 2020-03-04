import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UserEntity } from "../user/user.entity";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Injectable()
export class ConjugateService {
  constructor(
    @InjectRepository(ConjugateEntity)
    private readonly repository: Repository<ConjugateEntity>
  ) {}

  async create(params: CreateConjugateDto) {
    await this.clearCache(params.groupId);
    const tubeNumber = await this.getTubeNumber(params.groupId);
    return this.repository.save({ ...params, tubeNumber: tubeNumber });
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where({ id: id })
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.name"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name", "clone.isPhospho"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("conjugate.labeledByMember", "labeledByMember")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "labeledByMember.userId = user.id")
      .getOne();
  }

  async update(id: number, params: UpdateConjugateDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
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

  async updateArchiveState(id: number, params: UpdateStateDto) {
    await this.repository.update(id, { isArchived: params.state, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async getGroupConjugates(groupId: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where("conjugate.groupId = :groupId", { groupId: groupId })
      .andWhere("conjugate.isArchived = false")
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number", "lot.name"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name", "clone.reactivity"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("conjugate.labeledByMember", "labeledByMember")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "labeledByMember.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .cache(`group_${groupId}_conjugates`, 1000 * 60 * 60)
      .getMany();
  }

  async getLotConjugates(lotId: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where("conjugate.lotId = :lotId", { lotId: lotId })
      .andWhere("conjugate.isArchived = false")
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name", "clone.isPhospho"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("conjugate.labeledByMember", "labeledByMember")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "labeledByMember.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .getMany();
  }

  async getTagConjugates(tagId: number) {
    return this.repository
      .createQueryBuilder("conjugate")
      .where("conjugate.tagId = :tagId", { tagId: tagId })
      .andWhere("conjugate.isArchived = false")
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("lot.clone", "clone")
      .addSelect(["clone.id", "clone.name", "clone.isPhospho"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("conjugate.labeledByMember", "labeledByMember")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "labeledByMember.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .getMany();
  }

  async getTubeNumber(groupId: number) {
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

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_conjugates`]);
  }
}
