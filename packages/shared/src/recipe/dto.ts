import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class RecipeDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly purpose: string;

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly isPublic: boolean;

  @ApiModelProperty()
  readonly catchedInfo: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly groupId: number;
}

export class CreateRecipeDto {
  @IsString()
  @ApiModelProperty()
  readonly purpose: string;
}

export class UpdateRecipeDto {
  @IsString()
  @ApiModelProperty()
  readonly purpose: string;
}
