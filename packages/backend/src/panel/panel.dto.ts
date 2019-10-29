import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PanelDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly fluor: boolean;

  @ApiModelProperty()
  readonly application: boolean;

  @ApiModelProperty()
  readonly isProduction: boolean;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly details: string;

  @ApiModelProperty()
  readonly catchedInfo: string;
}

export class CreatePanelDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdatePanelDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
