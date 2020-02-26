import { Test, TestingModule } from "@nestjs/testing";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";

describe(ProviderService.name, () => {
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProviderEntity]), MemberModule, LotModule],
      providers: [ProviderService],
    }).compile();

    service = module.get<ProviderService>(ProviderService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
