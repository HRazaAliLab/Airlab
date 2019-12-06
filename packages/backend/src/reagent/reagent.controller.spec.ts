import { Test, TestingModule } from "@nestjs/testing";
import { ReagentController } from "./reagent.controller";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ReagentController", () => {
  let controller: ReagentController;
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity, MemberEntity])],
      controllers: [ReagentController],
      providers: [ReagentService, MemberService],
    }).compile();

    controller = module.get<ReagentController>(ReagentController);
    service = module.get<ReagentService>(ReagentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
