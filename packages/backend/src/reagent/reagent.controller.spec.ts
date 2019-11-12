import { Test, TestingModule } from "@nestjs/testing";
import { ReagentController } from "./reagent.controller";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ReagentController", () => {
  let controller: ReagentController;
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity, GroupUserEntity])],
      controllers: [ReagentController],
      providers: [ReagentService, GroupUserService],
    }).compile();

    controller = module.get<ReagentController>(ReagentController);
    service = module.get<ReagentService>(ReagentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
