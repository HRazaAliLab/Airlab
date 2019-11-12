import { Test, TestingModule } from "@nestjs/testing";
import { LotController } from "./lot.controller";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ReagentInstanceController", () => {
  let controller: LotController;
  let service: LotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([LotEntity, GroupUserEntity])],
      controllers: [LotController],
      providers: [LotService, GroupUserService],
    }).compile();

    controller = module.get<LotController>(LotController);
    service = module.get<LotService>(LotService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
