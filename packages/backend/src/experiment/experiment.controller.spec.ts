import { Test, TestingModule } from "@nestjs/testing";
import { ExperimentController } from "./experiment.controller";
import { ExperimentService } from "./experiment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperimentEntity } from "./experiment.entity";

describe("ExperimentController", () => {
  let controller: ExperimentController;
  let service: ExperimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ExperimentEntity])],
      controllers: [ExperimentController],
      providers: [ExperimentService],
    }).compile();

    controller = module.get<ExperimentController>(ExperimentController);
    service = module.get<ExperimentService>(ExperimentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
