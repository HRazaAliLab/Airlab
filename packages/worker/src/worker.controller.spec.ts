import { Test, TestingModule } from "@nestjs/testing";
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { ConfigModule } from "./config/config.module";

describe("WorkerController", () => {
  let controller: WorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [WorkerController],
      providers: [WorkerService],
    }).compile();

    controller = module.get<WorkerController>(WorkerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
