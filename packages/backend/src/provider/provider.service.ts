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

  async findAll() {
    return this.repository.find({
      select: ["id", "name"],
      order: {
        name: "ASC",
      },
    });
  }

  async create(params: CreateProviderDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateProviderDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name"],
    });
  }
}
