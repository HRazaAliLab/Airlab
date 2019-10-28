import { Test, TestingModule } from "@nestjs/testing";
import { PlateWellController } from "./plateWell.controller";
import { PlateWellService } from "./plateWell.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateWellEntity } from "./plateWell.entity";

describe("PlateWellController", () => {
  let controller: PlateWellController;
  let service: PlateWellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlateWellEntity])],
      controllers: [PlateWellController],
      providers: [PlateWellService],
    }).compile();

    controller = module.get<PlateWellController>(PlateWellController);
    service = module.get<PlateWellService>(PlateWellService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
