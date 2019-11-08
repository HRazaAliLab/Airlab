import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReagentEntity } from "./reagent.entity";
import { CreateReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";

@Injectable()
export class ReagentService {
  constructor(
    @InjectRepository(ReagentEntity)
    private readonly repository: Repository<ReagentEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateReagentDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateReagentDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllReagentsForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        isDeleted: false,
      },
    });
  }
}
