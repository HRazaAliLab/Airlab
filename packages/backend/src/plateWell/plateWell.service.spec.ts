import { Test, TestingModule } from "@nestjs/testing";
import { PlateWellService } from "./plateWell.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateWellEntity } from "./plateWell.entity";

describe("PlateWellService", () => {
  let service: PlateWellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlateWellEntity])],
      providers: [PlateWellService],
    }).compile();

    service = module.get<PlateWellService>(PlateWellService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
