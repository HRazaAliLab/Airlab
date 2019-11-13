import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ConjugateService {
  constructor(
    @InjectRepository(ConjugateEntity)
    private readonly repository: Repository<ConjugateEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateConjugateDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateConjugateDto) {
    await this.repository.update(id, params);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getAllConjugatesForGroup(userId: number) {
    const result = await this.repository
      .createQueryBuilder("conjugate")
      .leftJoin("conjugate.tag", "tag")
      .addSelect(["tag.id", "tag.name", "tag.mw"])
      .leftJoin("conjugate.lot", "lot")
      .addSelect(["lot.id", "lot.number"])
      .leftJoin("conjugate.groupUser", "groupUser")
      .leftJoinAndMapOne("conjugate.user", UserEntity, "user", "groupUser.userId = user.id")
      .orderBy({ "conjugate.tubeNumber": "DESC" })
      .getMany();
    return result;
  }

  async lastConjugateForGroup(groupId: number) {
    const entity = await this.repository.findOne({
      select: ["tubeNumber"],
      where: {
        groupId: groupId,
      },
      order: {
        tubeNumber: "DESC",
      },
    });
    return entity.tubeNumber + 1;
  }
}