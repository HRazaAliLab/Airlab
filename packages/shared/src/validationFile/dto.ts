import { IsInt, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ValidationFileDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly validationId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly hash: string;

  @ApiModelProperty()
  readonly size: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly extension: string;

  @ApiModelPropertyOptional()
  readonly description: string;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateValidationFileDto {
  readonly createdBy?: number;

  @IsString()
  @ApiModelProperty()
  readonly hash: string;

  @IsInt()
  @ApiModelProperty()
  readonly validationId: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly extension: string;

  @IsInt()
  @ApiModelProperty()
  readonly size: number;
}

export class UpdateValidationFileDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
