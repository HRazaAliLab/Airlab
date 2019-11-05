import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PlateDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly rows: number;

  @ApiModelProperty()
  readonly columns: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly groupId: number;
}

export class CreatePlateDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdatePlateDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
