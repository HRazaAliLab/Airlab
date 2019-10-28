import { Test, TestingModule } from "@nestjs/testing";
import { PlateService } from "./plate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateEntity } from "./plate.entity";

describe("PlateService", () => {
  let service: PlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlateEntity])],
      providers: [PlateService],
    }).compile();

    service = module.get<PlateService>(PlateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
