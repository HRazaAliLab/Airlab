import { Test, TestingModule } from "@nestjs/testing";
import { ExperimentService } from "./experiment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperimentEntity } from "./experiment.entity";

describe("ExperimentService", () => {
  let service: ExperimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ExperimentEntity])],
      providers: [ExperimentService],
    }).compile();

    service = module.get<ExperimentService>(ExperimentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
