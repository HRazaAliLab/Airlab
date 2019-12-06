import { Test, TestingModule } from "@nestjs/testing";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("CloneService", () => {
  let service: CloneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CloneEntity, MemberEntity])],
      providers: [CloneService, MemberService],
    }).compile();

    service = module.get<CloneService>(CloneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
