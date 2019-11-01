import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { CreateRecipeDto, RecipeDto, UpdateRecipeDto } from "./recipe.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("recipe")
@Controller("recipe")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: RecipeDto, isArray: true })
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: RecipeDto })
  findById(@Param("id") id: number) {
    return this.recipeService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: RecipeDto })
  async create(@Body() params: CreateRecipeDto) {
    return this.recipeService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: RecipeDto })
  async update(@Param("id") id: number, @Body() params: UpdateRecipeDto) {
    return this.recipeService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all recipes for the group.", type: RecipeDto, isArray: true })
  getAllRecipesForGroup(@Param("groupId") groupId: number) {
    return this.recipeService.getAllRecipesForGroup(groupId);
  }

  @Get("public")
  @ApiCreatedResponse({ description: "Find all public recipes.", type: RecipeDto, isArray: true })
  getAllRecipesPublic() {
    return this.recipeService.getAllRecipesPublic();
  }
}
