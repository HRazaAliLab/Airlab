import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidationEntity } from "./validation.entity";
import { CreateValidationDto, UpdateValidationDto } from "@airlab/shared/lib/validation/dto";
import { UserEntity } from "../user/user.entity";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(ValidationEntity)
    private readonly repository: Repository<ValidationEntity>
  ) {}

  async create(params: CreateValidationDto) {
    await this.clearCache(params.groupId);
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("validation")
      .select([
        "validation.id",
        "validation.groupId",
        "validation.application",
        "validation.positiveControl",
        "validation.negativeControl",
        "validation.status",
        "validation.incubationConditions",
        "validation.tissue",
        "validation.concentration",
        "validation.concentrationUnit",
        "validation.fixation",
        "validation.fixationNotes",
        "validation.notes",
        "validation.antigenRetrievalType",
        "validation.antigenRetrievalTime",
        "validation.antigenRetrievalTemperature",
        "validation.saponin",
        "validation.saponinConcentration",
        "validation.methanolTreatment",
        "validation.methanolTreatmentConcentration",
        "validation.surfaceStaining",
        "validation.surfaceStainingConcentration",
        "validation.createdAt",
      ])
      .where("validation.id = :id", { id: id })
      .leftJoin("validation.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("validation.lot", "lot")
      .addSelect(["lot.id", "lot.name"])
      .leftJoin("validation.conjugate", "conjugate")
      .addSelect(["conjugate.id", "conjugate.tubeNumber"])
      .leftJoin("validation.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("validation.validationFiles", "validationFiles")
      .addSelect(["validationFiles.id", "validationFiles.name"])
      .leftJoin("validation.member", "member")
      .leftJoinAndMapOne("validation.user", UserEntity, "user", "member.userId = user.id")
      .getOne();
  }

  async update(id: number, params: UpdateValidationDto) {
    await this.repository.update(id, { ...params, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
  }

  async deleteById(id: number) {
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async updateArchiveState(id: number, params: UpdateStateDto) {
    await this.repository.update(id, { isArchived: params.state, updatedAt: new Date().toISOString() });
    const item = await this.findById(id);
    await this.clearCache(item.groupId);
    return item;
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
        "validation.antigenRetrievalType",
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

  async getCloneValidations(cloneId: number) {
    return this.repository
      .createQueryBuilder("validation")
      .where("validation.cloneId = :cloneId", { cloneId: cloneId })
      .select([
        "validation.id",
        "validation.application",
        "validation.positiveControl",
        "validation.negativeControl",
        "validation.status",
        "validation.incubationConditions",
        "validation.tissue",
        "validation.concentration",
        "validation.concentrationUnit",
        "validation.fixation",
        "validation.fixationNotes",
        "validation.notes",
        "validation.antigenRetrievalType",
        "validation.antigenRetrievalTime",
        "validation.antigenRetrievalTemperature",
        "validation.saponin",
        "validation.saponinConcentration",
        "validation.methanolTreatment",
        "validation.methanolTreatmentConcentration",
        "validation.surfaceStaining",
        "validation.surfaceStainingConcentration",
        "validation.createdAt",
      ])
      .leftJoin("validation.clone", "clone")
      .addSelect(["clone.id", "clone.name"])
      .leftJoin("clone.protein", "protein")
      .addSelect(["protein.id", "protein.name"])
      .leftJoin("validation.lot", "lot")
      .addSelect(["lot.id", "lot.name"])
      .leftJoin("validation.conjugate", "conjugate")
      .addSelect(["conjugate.id", "conjugate.tubeNumber"])
      .leftJoin("validation.species", "species")
      .addSelect(["species.id", "species.name"])
      .leftJoin("validation.validationFiles", "validationFiles")
      .addSelect(["validationFiles.id", "validationFiles.name"])
      .leftJoin("validation.member", "member")
      .leftJoinAndMapOne("validation.user", UserEntity, "user", "member.userId = user.id")
      .orderBy({ "validation.id": "DESC" })
      .getMany();
  }

  async clearCache(groupId: number) {
    await this.repository.manager.connection.queryResultCache.remove([`group_${groupId}_validations`]);
  }
}
