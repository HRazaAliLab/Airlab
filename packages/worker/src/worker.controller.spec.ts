import { Test, TestingModule } from "@nestjs/testing";
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { ConfigService } from "./config/config.service";

describe("WorkerController", () => {
  let controller: WorkerController;
  let service: WorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WorkerController],
      providers: [WorkerService, ConfigService],
    }).compile();

    controller = module.get<WorkerController>(WorkerController);
    service = module.get<WorkerService>(WorkerService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
