import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SpeciesProteinEntity } from "./speciesProtein.entity";
import { CreateSpeciesProteinDto, UpdateSpeciesProteinDto } from "./speciesProtein.dto";

@Injectable()
export class SpeciesProteinService {
  constructor(
    @InjectRepository(SpeciesProteinEntity)
    private readonly repository: Repository<SpeciesProteinEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateSpeciesProteinDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateSpeciesProteinDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllSpeciesProteinsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }
}
