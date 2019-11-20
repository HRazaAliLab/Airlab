import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";
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
  readonly prefferedTagId: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly isotype: string;

  @ApiModelProperty()
  readonly epitope: string;

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
  readonly createdBy?: number;

  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly proteinId: number;

  @IsInt()
  @ApiModelProperty()
  readonly speciesId: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly isotype: string;

  @IsString()
  @ApiModelProperty()
  readonly epitope: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isPhospho: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isPolyclonal: boolean;

  @IsArray()
  @ApiModelProperty()
  readonly reactivity: number[];

  @ApiModelProperty()
  readonly application: object;
}

export class UpdateCloneDto {
  @IsInt()
  @ApiModelProperty()
  readonly proteinId: number;

  @IsInt()
  @ApiModelProperty()
  readonly speciesId: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly isotype: string;

  @IsString()
  @ApiModelProperty()
  readonly epitope: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isPhospho: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isPolyclonal: boolean;

  @IsArray()
  @ApiModelProperty()
  readonly reactivity: number[];

  @ApiModelProperty()
  readonly application: object;
}
