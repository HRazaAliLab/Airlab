import { Test, TestingModule } from "@nestjs/testing";
import { PlateController } from "./plate.controller";
import { PlateService } from "./plate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateEntity } from "./plate.entity";

describe("PlateController", () => {
  let controller: PlateController;
  let service: PlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlateEntity])],
      controllers: [PlateController],
      providers: [PlateService],
    }).compile();

    controller = module.get<PlateController>(PlateController);
    service = module.get<PlateService>(PlateService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
