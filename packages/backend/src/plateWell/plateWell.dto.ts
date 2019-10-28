import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class PlateWellDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly plateId: number;

  @ApiModelProperty()
  readonly position: number;

  @ApiModelProperty()
  readonly text: string;
}

export class CreatePlateWellDto {
  @IsString()
  @ApiModelPropertyOptional()
  readonly text: string;
}

export class UpdatePlateWellDto {
  @IsString()
  @ApiModelPropertyOptional()
  readonly text: string;
}
