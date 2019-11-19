import { Test, TestingModule } from "@nestjs/testing";
import { ValidationFileService } from "./validationFile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationFileEntity } from "./validationFile.entity";

describe("ValidationFileService", () => {
  let service: ValidationFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ValidationFileEntity])],
      providers: [ValidationFileService],
    }).compile();

    service = module.get<ValidationFileService>(ValidationFileService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
