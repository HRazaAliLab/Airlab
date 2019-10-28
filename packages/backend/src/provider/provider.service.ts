import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderEntity } from "./provider.entity";
import { CreateProviderDto, UpdateProviderDto } from "./provider.dto";

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly repository: Repository<ProviderEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateProviderDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateProviderDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }
}
