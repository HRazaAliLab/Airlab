import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommercialReagentEntity } from "./commercialReagent.entity";
import { CreateCommercialReagentDto, UpdateCommercialReagentDto } from "./commercialReagent.dto";

@Injectable()
export class CommercialReagentService {
  constructor(
    @InjectRepository(CommercialReagentEntity)
    private readonly repository: Repository<CommercialReagentEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateCommercialReagentDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateCommercialReagentDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllCommercialReagentsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        isDeleted: null,
      },
    });
  }
}
