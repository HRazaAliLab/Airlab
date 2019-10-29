import { Test, TestingModule } from "@nestjs/testing";
import { PartController } from "./part.controller";
import { PartService } from "./part.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartEntity } from "./part.entity";

describe("PartController", () => {
  let controller: PartController;
  let service: PartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PartEntity])],
      controllers: [PartController],
      providers: [PartService],
    }).compile();

    controller = module.get<PartController>(PartController);
    service = module.get<PartService>(PartService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
