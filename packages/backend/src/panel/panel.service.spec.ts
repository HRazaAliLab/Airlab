import { Test, TestingModule } from "@nestjs/testing";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("PanelService", () => {
  let service: PanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PanelEntity, MemberEntity])],
      providers: [PanelService, MemberService],
    }).compile();

    service = module.get<PanelService>(PanelService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
