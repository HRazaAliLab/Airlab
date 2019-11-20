import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidationEntity } from "./validation.entity";
import { CreateValidationDto, UpdateValidationDto } from "@airlab/shared/lib/validation/dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(ValidationEntity)
    private readonly repository: Repository<ValidationEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateValidationDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateValidationDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      relations: ["validationFiles"],
    });
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getAllValidationsForGroup(userId: number) {
    const result = await this.repository
      .createQueryBuilder("validation")
      .select([
        "validation.id",
        "validation.application",
        "validation.positiveControl",
        "validation.negativeControl",
        "validation.status",
      ])
      .leftJoin("validation.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("validation.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("validation.conjugate", "conjugate")
      .addSelect(["conjugate.id", "conjugate.tubeNumber"])
      .leftJoin("validation.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("validation.validationFiles", "validationFiles")
      .addSelect(["validationFiles.id", "validationFiles.name"])
      .leftJoin("validation.groupUser", "groupUser")
      .leftJoinAndMapOne("validation.user", UserEntity, "user", "groupUser.userId = user.id")
      .orderBy({ "validation.id": "DESC" })
      .getMany();
    return result;
  }
}
