import { Test, TestingModule } from "@nestjs/testing";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ProteinService", () => {
  let service: ProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity, MemberEntity])],
      providers: [ProteinService, MemberService],
    }).compile();

    service = module.get<ProteinService>(ProteinService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
