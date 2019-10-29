import { Test, TestingModule } from "@nestjs/testing";
import { ReagentInstanceService } from "./reagentInstance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentInstanceEntity } from "./reagentInstance.entity";

describe("ReagentInstanceService", () => {
  let service: ReagentInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentInstanceEntity])],
      providers: [ReagentInstanceService],
    }).compile();

    service = module.get<ReagentInstanceService>(ReagentInstanceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
