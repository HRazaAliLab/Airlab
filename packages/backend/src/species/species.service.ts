import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SpeciesEntity } from "./species.entity";
import { CreateSpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly repository: Repository<SpeciesEntity>
  ) {}

  async create(params: CreateSpeciesDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async import(params) {
    delete params.id;
    return await this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      select: { id: true, groupId: true, name: true, acronym: true, createdAt: true },
    });
  }

  async update(id: number, params: UpdateSpeciesDto) {
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

  async getGroupSpecies(groupId: number) {
    return this.repository.find({
      select: { id: true, name: true, acronym: true },
      where: {
        groupId: groupId,
      },
      order: {
        id: "DESC",
      },
      cache: {
        id: `group_${groupId}_species`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }

  async exportSpecies(groupId?: number) {
    return groupId
      ? this.repository.find({
          select: { id: true, groupId: true, name: true, acronym: true, meta: true, createdAt: true },
          where: {
            groupId: groupId,
          },
          order: {
            id: "ASC",
          },
        })
      : this.repository.find({
          select: { id: true, groupId: true, name: true, acronym: true, meta: true, createdAt: true },
          order: {
            id: "ASC",
          },
        });
  }

  private async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache?.remove([`group_${groupId}_species`]);
  }
}
