import { Test, TestingModule } from "@nestjs/testing";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { MemberModule } from "../member/member.module";
import { ConjugateModule } from "../conjugate/conjugate.module";

describe(LotService.name, () => {
  let service: LotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([LotEntity]), MemberModule, ConjugateModule],
      providers: [LotService],
    }).compile();

    service = module.get<LotService>(LotService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
