import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";

describe("SpeciesService", () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesEntity])],
      providers: [SpeciesService],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
