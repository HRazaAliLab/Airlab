import { Test, TestingModule } from "@nestjs/testing";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";

describe("LotService", () => {
  let service: LotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([LotEntity])],
      providers: [LotService],
    }).compile();

    service = module.get<LotService>(LotService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
