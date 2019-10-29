import { Module } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeEntity } from "./recipe.entity";
import { RecipeController } from "./recipe.controller";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
