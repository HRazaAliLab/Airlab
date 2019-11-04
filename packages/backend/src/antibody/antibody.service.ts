import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AntibodyEntity } from "./antibody.entity";
import { CreateAntibodyDto, UpdateAntibodyDto } from "./antibody.dto";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

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

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async getAllAntibodiesForUser(userId: number) {
    return this.repository
      .createQueryBuilder("antibody")
      .leftJoin(GroupUserEntity, "groupUser", "antibody.groupId = groupUser.groupId")
      .where("groupUser.userId = :userId", { userId: userId })
      .orderBy({ "antibody.labBBTubeNumber": "DESC" })
      .getMany();
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
