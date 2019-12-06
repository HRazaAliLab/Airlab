import { Test, TestingModule } from "@nestjs/testing";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ReagentService", () => {
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity, MemberEntity])],
      providers: [ReagentService, MemberService],
    }).compile();

    service = module.get<ReagentService>(ReagentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
