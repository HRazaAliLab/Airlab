import { Test, TestingModule } from "@nestjs/testing";
import { ValidationController } from "./validation.controller";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";

describe("ValidationController", () => {
  let controller: ValidationController;
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ValidationEntity])],
      controllers: [ValidationController],
      providers: [ValidationService],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
    service = module.get<ValidationService>(ValidationService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
