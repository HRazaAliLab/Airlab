import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PartDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly closedAt: string;

  @ApiModelProperty()
  readonly position: number;

  @ApiModelProperty()
  readonly ensayoId: number;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly language: string;

  @ApiModelProperty()
  readonly theme: string;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly fileXtension: string;

  @ApiModelProperty()
  readonly text: string;

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly catchedInfo: string;

  @ApiModelProperty()
  readonly groupId: number;
}

export class CreatePartDto {
  @IsString()
  @ApiModelProperty()
  readonly title: string;
}

export class UpdatePartDto {
  @IsString()
  @ApiModelProperty()
  readonly title: string;
}
