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
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateProteinDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name", "description"],
    });
  }

  async getAllProteinsForGroup(groupId: number) {
    return this.repository.find({
      select: ["id", "name", "description"],
      where: {
        groupId: groupId,
      },
    });
  }
}
