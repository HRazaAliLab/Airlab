import { Test, TestingModule } from "@nestjs/testing";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";

describe("ProviderService", () => {
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProviderEntity, MemberEntity])],
      providers: [ProviderService, MemberService],
    }).compile();

    service = module.get<ProviderService>(ProviderService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
