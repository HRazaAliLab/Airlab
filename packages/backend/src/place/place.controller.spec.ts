import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaceEntity } from "./place.entity";

describe("PlaceController", () => {
  let controller: PlaceController;
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PlaceEntity])],
      controllers: [PlaceController],
      providers: [PlaceService],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    service = module.get<PlaceService>(PlaceService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
