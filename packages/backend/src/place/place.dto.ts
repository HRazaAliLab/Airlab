import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PlaceDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly columns: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly parentId: number;

  @ApiModelProperty()
  readonly rows: number;

  @ApiModelProperty()
  readonly selves: number;

  @ApiModelProperty()
  readonly tubeId: number;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly x: number;

  @ApiModelProperty()
  readonly y: number;
}

export class CreatePlaceDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdatePlaceDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
