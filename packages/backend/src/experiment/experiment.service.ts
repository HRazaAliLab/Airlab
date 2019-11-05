import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExperimentEntity } from "./experiment.entity";
import { CreateExperimentDto, UpdateExperimentDto } from "@airlab/shared/lib/experiment/dto";

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(ExperimentEntity)
    private readonly repository: Repository<ExperimentEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateExperimentDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateExperimentDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllExperimentsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllExperimentsForGroupUser(groupUserId: number) {
    return this.repository.find({
      where: {
        createdBy: groupUserId,
      },
    });
  }

  async canSeeExperiment(experimentId: number, groupId: number) {
    return this.repository.find({
      where: {
        id: experimentId,
        groupId: groupId,
      },
    });
  }
}
