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

  async create(params: CreateValidationDto) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${params.groupId}_validations`]);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id, {
      relations: ["validationFiles"],
    });
  }

  async update(id: number, params: UpdateValidationDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_validations`]);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.repository.manager.connection.queryResultCache.remove([`group_${item.groupId}_validations`]);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getGroupValidations(groupId: number) {
    return this.repository
      .createQueryBuilder("validation")
      .where("validation.groupId = :groupId", { groupId: groupId })
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
      .leftJoin("validation.member", "member")
      .leftJoinAndMapOne("validation.user", UserEntity, "user", "member.userId = user.id")
      .orderBy({ "validation.id": "DESC" })
      .cache(`group_${groupId}_validations`, 1000 * 60 * 60)
      .getMany();
  }
}
