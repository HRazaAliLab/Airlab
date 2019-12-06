import { Test, TestingModule } from "@nestjs/testing";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { UserEntity } from "../user/user.entity";

describe("GroupService", () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([GroupEntity, MemberEntity, UserEntity])],
      providers: [GroupService, MemberService],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
