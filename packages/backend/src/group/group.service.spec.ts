import { Test, TestingModule } from "@nestjs/testing";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { UtilsService } from "../utils/utils.service";
import { ConfigService } from "../config/config.service";
import { UserEntity } from "../user/user.entity";

describe("GroupService", () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([GroupEntity, GroupUserEntity, UserEntity])],
      providers: [GroupService, GroupUserService, UtilsService, ConfigService],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
