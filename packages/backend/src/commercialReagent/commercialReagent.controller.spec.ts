import { Test, TestingModule } from "@nestjs/testing";
import { CommercialReagentController } from "./commercialReagent.controller";
import { CommercialReagentService } from "./commercialReagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommercialReagentEntity } from "./commercialReagent.entity";

describe("CommercialReagentController", () => {
  let controller: CommercialReagentController;
  let service: CommercialReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CommercialReagentEntity])],
      controllers: [CommercialReagentController],
      providers: [CommercialReagentService],
    }).compile();

    controller = module.get<CommercialReagentController>(CommercialReagentController);
    service = module.get<CommercialReagentService>(CommercialReagentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
