import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";

describe("FileService", () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([FileEntity])],
      providers: [FileService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
