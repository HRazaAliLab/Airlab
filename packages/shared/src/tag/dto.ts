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
  readonly isFluorphore: boolean;

  @ApiModelProperty()
  readonly isMetal: boolean;

  @ApiModelPropertyOptional()
  readonly emission: string;

  @ApiModelPropertyOptional()
  readonly excitation: string;
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
  readonly isFluorphore: boolean;

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
  readonly isFluorphore: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isMetal: boolean;
}
