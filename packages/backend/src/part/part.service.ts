import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartEntity } from "./part.entity";
import { CreatePartDto, UpdatePartDto } from "./part.dto";

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(PartEntity)
    private readonly repository: Repository<PartEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreatePartDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePartDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllPartsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllPartsForExperiment(experimentId: number) {
    return this.repository.find({
      where: {
        ensayoId: experimentId,
        deleted: [null, 0],
      },
    });
  }
}
