import { Test, TestingModule } from "@nestjs/testing";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("LotService", () => {
  let service: LotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([LotEntity, MemberEntity])],
      providers: [LotService, MemberService],
    }).compile();

    service = module.get<LotService>(LotService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
