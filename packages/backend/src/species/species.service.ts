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

  async findAll() {
    return this.repository.find({
      select: ["id", "name", "acronym"],
    });
  }

  async create(params: CreateSpeciesDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateSpeciesDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      select: ["id", "name", "acronym"],
    });
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }
}
