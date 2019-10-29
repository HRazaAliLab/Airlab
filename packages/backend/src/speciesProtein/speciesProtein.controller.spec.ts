import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesProteinController } from "./speciesProtein.controller";
import { SpeciesProteinService } from "./speciesProtein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesProteinEntity } from "./speciesProtein.entity";

describe("SpeciesProteinController", () => {
  let controller: SpeciesProteinController;
  let service: SpeciesProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesProteinEntity])],
      controllers: [SpeciesProteinController],
      providers: [SpeciesProteinService],
    }).compile();

    controller = module.get<SpeciesProteinController>(SpeciesProteinController);
    service = module.get<SpeciesProteinService>(SpeciesProteinService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
