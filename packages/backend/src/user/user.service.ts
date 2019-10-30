import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "@airlab/shared/lib/user/dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateUserDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateUserDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email: email },
    });
  }
}
