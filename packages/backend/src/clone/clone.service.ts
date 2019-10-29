import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CloneEntity } from "./clone.entity";
import { CreateCloneDto, UpdateCloneDto } from "./clone.dto";

@Injectable()
export class CloneService {
  constructor(
    @InjectRepository(CloneEntity)
    private readonly repository: Repository<CloneEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateCloneDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateCloneDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllClonesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }

  async getAllClonesForGroupWithProteinName(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        deleted: null,
      },
      join: {
        alias: "protein",
        leftJoinAndSelect: {
          profile: "user.profile",
          photo: "user.photos",
          video: "user.videos",
        },
      },
    });
  }
}
