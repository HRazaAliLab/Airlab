import { Test, TestingModule } from "@nestjs/testing";
import { PanelController } from "./panel.controller";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { MemberModule } from "../member/member.module";

describe(PanelController.name, () => {
  let controller: PanelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelEntity]), MemberModule],
      providers: [PanelService],
      controllers: [PanelController],
    }).compile();

    controller = module.get<PanelController>(PanelController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
