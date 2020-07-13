import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CloneEntity } from "./clone.entity";
import { CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Injectable()
export class CloneService {
  constructor(
    @InjectRepository(CloneEntity)
    private readonly repository: Repository<CloneEntity>
  ) {}

  async create(params: CreateCloneDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.id = :id", { id: id })
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.species", "species")
      .addSelect(["species.id", "species.name"])
      .getOne();
  }

  async update(id: number, params: UpdateCloneDto) {
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

  async getGroupClones(groupId: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.groupId = :groupId", { groupId: groupId })
      .andWhere("clone.isArchived = false")
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("clone.validations", "validations")
      .addSelect(["validations.id", "validations.application", "validations.status"])
      .orderBy("clone.id", "DESC")
      .cache(`group_${groupId}_clones`, 1000 * 60 * 60)
      .getMany();
  }

  async getGroupArchivedClones(groupId: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.groupId = :groupId", { groupId: groupId })
      .andWhere("clone.isArchived = true")
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("clone.validations", "validations")
      .addSelect(["validations.id", "validations.application", "validations.status"])
      .orderBy("clone.id", "DESC")
      .getMany();
  }

  async getProteinClones(proteinId: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.proteinId = :proteinId", { proteinId: proteinId })
      .andWhere("clone.isArchived = false")
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("clone.validations", "validations")
      .addSelect(["validations.id", "validations.application", "validations.status"])
      .orderBy("clone.id", "DESC")
      .getMany();
  }

  async getSpeciesClones(speciesId: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.speciesId = :speciesId", { speciesId: speciesId })
      .andWhere("clone.isArchived = false")
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.validations", "validations")
      .addSelect(["validations.id", "validations.application", "validations.status"])
      .orderBy("clone.id", "DESC")
      .getMany();
  }

  async exportGroupClones(groupId: number) {
    return this.repository.find({
      select: [
        "id",
        "groupId",
        "createdBy",
        "proteinId",
        "speciesId",
        "name",
        "isotype",
        "epitope",
        "isPhospho",
        "isPolyclonal",
        "reactivity",
        "application",
        "isArchived",
        "meta",
        "createdAt",
        "updatedAt",
      ],
      where: {
        groupId: groupId,
      },
      order: {
        id: "ASC",
      },
    });
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_clones`]);
  }
}
