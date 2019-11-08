import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { LotEntity } from "../lot/lot.entity";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity, GroupEntity, GroupUserEntity, LotEntity]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
