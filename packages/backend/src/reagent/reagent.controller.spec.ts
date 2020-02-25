import { Test, TestingModule } from "@nestjs/testing";
import { ReagentController } from "./reagent.controller";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";

describe(ReagentController.name, () => {
  let controller: ReagentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity]), MemberModule, LotModule],
      providers: [ReagentService],
      controllers: [ReagentController],
    }).compile();

    controller = module.get<ReagentController>(ReagentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
