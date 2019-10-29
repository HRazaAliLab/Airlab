import { Test, TestingModule } from "@nestjs/testing";
import { ReagentInstanceController } from "./reagentInstance.controller";
import { ReagentInstanceService } from "./reagentInstance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentInstanceEntity } from "./reagentInstance.entity";

describe("ReagentInstanceController", () => {
  let controller: ReagentInstanceController;
  let service: ReagentInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentInstanceEntity])],
      controllers: [ReagentInstanceController],
      providers: [ReagentInstanceService],
    }).compile();

    controller = module.get<ReagentInstanceController>(ReagentInstanceController);
    service = module.get<ReagentInstanceService>(ReagentInstanceService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
