import { Test, TestingModule } from "@nestjs/testing";
import { PanelElementService } from "./panelElement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelElementEntity } from "./panelElement.entity";
import { MemberModule } from "../member/member.module";

describe(PanelElementService.name, () => {
  let service: PanelElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelElementEntity]), MemberModule],
      providers: [PanelElementService],
    }).compile();

    service = module.get<PanelElementService>(PanelElementService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
