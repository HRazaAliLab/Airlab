import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlaceEntity } from "./place.entity";
import { CreatePlaceDto, UpdatePlaceDto } from "@airlab/shared/lib/place/dto";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly repository: Repository<PlaceEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreatePlaceDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdatePlaceDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async getAllPlacesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
      },
    });
  }
}
