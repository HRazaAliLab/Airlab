import { Test, TestingModule } from "@nestjs/testing";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { UserEntity } from "../user/user.entity";

describe("GroupController", () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([GroupEntity, MemberEntity, UserEntity])],
      controllers: [GroupController],
      providers: [GroupService, MemberService],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
