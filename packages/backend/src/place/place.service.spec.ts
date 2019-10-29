import { Test, TestingModule } from "@nestjs/testing";
import { PlaceService } from "./place.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaceEntity } from "./place.entity";

describe("PlaceService", () => {
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlaceEntity])],
      providers: [PlaceService],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
