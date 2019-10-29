import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RecipeEntity } from "./recipe.entity";
import { CreateRecipeDto, UpdateRecipeDto } from "./recipe.dto";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(params: CreateRecipeDto) {
    return this.repository.save(params);
  }

  async update(id: number, params: UpdateRecipeDto) {
    return this.repository.update(id, params);
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllRecipesForGroup(groupId: number) {
    return this.repository.find({
      where: {
        groupId: groupId,
        deleted: null,
      },
    });
  }

  async getAllRecipesPublic() {
    return this.repository.find({
      where: {
        isPublic: true,
      },
    });
  }
}
