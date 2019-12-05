import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderEntity } from "./provider.entity";
import { CreateProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly repository: Repository<ProviderEntity>
  ) {}

  async create(params: CreateProviderDto) {
    await this.repository.manager.connection.queryResultCache.remove(["providers"]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "groupId", "name"],
    });
  }

  async update(id: number, params: UpdateProviderDto) {
    await this.repository.update(id, params);
    await this.repository.manager.connection.queryResultCache.remove(["providers"]);
    return this.findById(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    await this.repository.manager.connection.queryResultCache.remove(["providers"]);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupProviders(groupId: number) {
    return this.repository.find({
      select: ["id", "groupId", "name"],
      where: {
        groupId: groupId,
      },
      order: {
        id: "DESC",
      },
      cache: {
        id: "providers",
        milliseconds: 1000 * 60 * 60,
      },
    });
  }
}
