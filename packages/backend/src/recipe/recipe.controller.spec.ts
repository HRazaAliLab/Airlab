import { Test, TestingModule } from "@nestjs/testing";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeEntity } from "./recipe.entity";

describe("RecipeController", () => {
  let controller: RecipeController;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([RecipeEntity])],
      controllers: [RecipeController],
      providers: [RecipeService],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get<RecipeService>(RecipeService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
