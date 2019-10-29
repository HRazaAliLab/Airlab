import { Test, TestingModule } from "@nestjs/testing";
import { RecipeService } from "./recipe.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeEntity } from "./recipe.entity";

describe("RecipeService", () => {
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([RecipeEntity])],
      providers: [RecipeService],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
