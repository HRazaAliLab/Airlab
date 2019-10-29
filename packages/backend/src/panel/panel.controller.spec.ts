import { Test, TestingModule } from "@nestjs/testing";
import { PanelController } from "./panel.controller";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";

describe("PanelController", () => {
  let controller: PanelController;
  let service: PanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelEntity])],
      controllers: [PanelController],
      providers: [PanelService],
    }).compile();

    controller = module.get<PanelController>(PanelController);
    service = module.get<PanelService>(PanelService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
