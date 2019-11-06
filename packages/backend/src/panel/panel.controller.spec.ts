import { Test, TestingModule } from "@nestjs/testing";
import { PanelController } from "./panel.controller";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("PanelController", () => {
  let controller: PanelController;
  let service: PanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelEntity, GroupUserEntity])],
      controllers: [PanelController],
      providers: [PanelService, GroupUserService],
    }).compile();

    controller = module.get<PanelController>(PanelController);
    service = module.get<PanelService>(PanelService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
