import { Test, TestingModule } from "@nestjs/testing";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("PanelService", () => {
  let service: PanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelEntity, GroupUserEntity])],
      providers: [PanelService, GroupUserService],
    }).compile();

    service = module.get<PanelService>(PanelService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
