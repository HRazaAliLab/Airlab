import { IsBoolean, IsInt, IsJSON, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class CloneDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly proteinId: number;

  @ApiModelProperty()
  readonly speciesId: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly isotype: string;

  @ApiModelProperty()
  readonly region: string;

  @ApiModelProperty()
  readonly isPhospho: boolean;

  @ApiModelProperty()
  readonly isPolyclonal: boolean;

  @ApiModelProperty()
  readonly reactivity: number[];

  @ApiModelProperty()
  readonly application: object;

  @ApiModelProperty()
  readonly isDeleted: boolean;

  @ApiModelProperty()
  readonly isPublic: boolean;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;

  @ApiModelPropertyOptional()
  readonly updatedAt: string;
}

export class CreateCloneDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateCloneDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
