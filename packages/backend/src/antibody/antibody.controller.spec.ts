import { Test, TestingModule } from "@nestjs/testing";
import { AntibodyController } from "./antibody.controller";
import { AntibodyService } from "./antibody.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AntibodyEntity } from "./antibody.entity";

describe("AntibodyController", () => {
  let controller: AntibodyController;
  let service: AntibodyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([AntibodyEntity])],
      controllers: [AntibodyController],
      providers: [AntibodyService],
    }).compile();

    controller = module.get<AntibodyController>(AntibodyController);
    service = module.get<AntibodyService>(AntibodyService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
