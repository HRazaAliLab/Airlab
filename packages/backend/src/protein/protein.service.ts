import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProteinEntity } from "./protein.entity";
import { CreateProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

@Injectable()
export class ProteinService {
  constructor(
    @InjectRepository(ProteinEntity)
    private readonly repository: Repository<ProteinEntity>
  ) {}

  async create(params: CreateProteinDto) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_proteins`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "name", "description"],
    });
  }

  async update(id: number, params: UpdateProteinDto) {
    await this.repository.update(id, params);
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_proteins`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_proteins`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupProteins(groupId: number) {
    return this.repository.find({
      select: ["id", "name", "description"],
      where: {
        groupId: groupId,
      },
      order: {
        id: "DESC",
      },
      cache: {
        id: `group_${groupId}_proteins`,
        milliseconds: 1000 * 60 * 60,
      },
    });
  }
}
