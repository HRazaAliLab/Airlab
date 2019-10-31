import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AntibodyEntity } from "./antibody.entity";
import { CreateAntibodyDto, UpdateAntibodyDto } from "./antibody.dto";

@Injectable()
export class AntibodyService {
  constructor(
    @InjectRepository(AntibodyEntity)
    private readonly repository: Repository<AntibodyEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateAntibodyDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateAntibodyDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllAntibodiesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async lastAntibodyForGroup(groupId: number) {
    const entity = await this.repository.findOne({
      select: ["bbTubeNumber"],
      where: {
        groupId: groupId,
      },
      order: {
        bbTubeNumber: "DESC",
      },
    });
    return entity.bbTubeNumber + 1;
  }
}
