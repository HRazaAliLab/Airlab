import { Test, TestingModule } from "@nestjs/testing";
import { ValidationFileController } from "./validationFile.controller";
import { ValidationFileService } from "./validationFile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationFileEntity } from "./validationFile.entity";

describe("ValidationFileController", () => {
  let controller: ValidationFileController;
  let service: ValidationFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ValidationFileEntity])],
      controllers: [ValidationFileController],
      providers: [ValidationFileService],
    }).compile();

    controller = module.get<ValidationFileController>(ValidationFileController);
    service = module.get<ValidationFileService>(ValidationFileService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
