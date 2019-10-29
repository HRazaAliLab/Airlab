import { Test, TestingModule } from "@nestjs/testing";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";

describe("TagService", () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity])],
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
