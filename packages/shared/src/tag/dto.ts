import { IsBoolean, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class TagDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly mw: string;

  @ApiModelProperty()
  readonly isFluorophore: boolean;

  @ApiModelProperty()
  readonly isMetal: boolean;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateTagDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly mw: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isFluorophore: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isMetal: boolean;
}

export class UpdateTagDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly mw: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isFluorophore: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isMetal: boolean;
}
