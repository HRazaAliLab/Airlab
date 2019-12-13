import { Test, TestingModule } from "@nestjs/testing";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";
import { ValidationModule } from "../validation/validation.module";

describe(CloneService.name, () => {
  let service: CloneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([CloneEntity]),
        MemberModule,
        LotModule,
        ValidationModule,
      ],
      providers: [CloneService],
    }).compile();

    service = module.get<CloneService>(CloneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
