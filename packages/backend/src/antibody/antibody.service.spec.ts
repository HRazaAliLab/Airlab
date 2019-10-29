import { Test, TestingModule } from "@nestjs/testing";
import { AntibodyService } from "./antibody.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AntibodyEntity } from "./antibody.entity";

describe("AntibodyService", () => {
  let service: AntibodyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([AntibodyEntity])],
      providers: [AntibodyService],
    }).compile();

    service = module.get<AntibodyService>(AntibodyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
