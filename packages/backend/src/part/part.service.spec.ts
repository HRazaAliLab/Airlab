import { Test, TestingModule } from "@nestjs/testing";
import { PartService } from "./part.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartEntity } from "./part.entity";

describe("PartService", () => {
  let service: PartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([PartEntity])],
      providers: [PartService],
    }).compile();

    service = module.get<PartService>(PartService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
