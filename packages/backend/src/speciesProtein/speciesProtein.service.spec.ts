import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesProteinService } from "./speciesProtein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesProteinEntity } from "./speciesProtein.entity";

describe("SpeciesProteinService", () => {
  let service: SpeciesProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesProteinEntity])],
      providers: [SpeciesProteinService],
    }).compile();

    service = module.get<SpeciesProteinService>(SpeciesProteinService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
