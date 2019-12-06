import { Test, TestingModule } from "@nestjs/testing";
import { LotController } from "./lot.controller";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ReagentInstanceController", () => {
  let controller: LotController;
  let service: LotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([LotEntity, MemberEntity])],
      controllers: [LotController],
      providers: [LotService, MemberService],
    }).compile();

    controller = module.get<LotController>(LotController);
    service = module.get<LotService>(LotService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
