import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

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
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdatePanelDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
