import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CloneEntity } from "./clone.entity";
import { CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";

@Injectable()
export class CloneService {
  constructor(
    @InjectRepository(CloneEntity)
    private readonly repository: Repository<CloneEntity>
  ) {}

  async create(params: CreateCloneDto) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_clones`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, params: UpdateCloneDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_clones`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_clones`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupClones(groupId: number) {
    return this.repository
      .createQueryBuilder("clone")
      .where("clone.groupId = :groupId", { groupId: groupId })
      .andWhere("clone.isDeleted = false")
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("clone.species", "species")
      .addSelect(["species.id", "species.name"])
      .orderBy("clone.id", "DESC")
      .cache(`group_${groupId}_clones`, 1000 * 60 * 60)
      .getMany();
  }
}
