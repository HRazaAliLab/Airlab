import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class PanelDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly details: object;

  @ApiModelProperty()
  readonly isFluor: boolean;

  @ApiModelProperty()
  readonly isProduction: boolean;

  @ApiModelProperty()
  readonly application: number;

  @ApiModelProperty()
  readonly meta: object;

  @ApiModelProperty()
  readonly isDeleted: boolean;

  @ApiModelProperty()
  readonly createdAt: string;
}

export class CreatePanelDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly description: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isFluor: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isProduction: boolean;

  @IsInt()
  @IsOptional()
  @ApiModelProperty()
  readonly application: number | null;
}

export class UpdatePanelDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly description: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isFluor: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isProduction: boolean;

  @IsInt()
  @IsOptional()
  @ApiModelProperty()
  readonly application: number | null;
}
