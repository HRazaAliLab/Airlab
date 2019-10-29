import { Test, TestingModule } from "@nestjs/testing";
import { CommercialReagentService } from "./commercialReagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommercialReagentEntity } from "./commercialReagent.entity";

describe("CommercialReagentService", () => {
  let service: CommercialReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CommercialReagentEntity])],
      providers: [CommercialReagentService],
    }).compile();

    service = module.get<CommercialReagentService>(CommercialReagentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
