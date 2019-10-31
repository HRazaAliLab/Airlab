import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProteinEntity } from "./protein.entity";
import { CreateProteinDto, UpdateProteinDto } from "./protein.dto";

@Injectable()
export class ProteinService {
  constructor(
    @InjectRepository(ProteinEntity)
    private readonly repository: Repository<ProteinEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateProteinDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateProteinDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllProteinsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }
}
