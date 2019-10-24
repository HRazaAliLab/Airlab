import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./group.entity";
import { CreateGroupDto } from "./group.dto";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async create(params: CreateGroupDto): Promise<Group> {
    return this.groupRepository.save(params);
  }
}
