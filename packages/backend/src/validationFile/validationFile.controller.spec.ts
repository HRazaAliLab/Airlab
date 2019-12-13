import { Test, TestingModule } from "@nestjs/testing";
import { ValidationFileController } from "./validationFile.controller";
import { ValidationFileService } from "./validationFile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationFileEntity } from "./validationFile.entity";

describe(ValidationFileController.name, () => {
  let controller: ValidationFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ValidationFileEntity])],
      providers: [ValidationFileService],
      controllers: [ValidationFileController],
    }).compile();

    controller = module.get<ValidationFileController>(ValidationFileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
