import { Test, TestingModule } from "@nestjs/testing";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";

describe(ReagentService.name, () => {
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity]), MemberModule, LotModule],
      providers: [ReagentService],
    }).compile();

    service = module.get<ReagentService>(ReagentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
