import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class ExperimentDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly conclusions: string;

  @ApiModelProperty()
  readonly hypothesis: string;

  @ApiModelProperty()
  readonly tubeValidatedId: number;

  @ApiModelProperty()
  readonly planId: number;

  @ApiModelProperty()
  readonly purpose: string;

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly catchedInfo: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly groupId: number;
}

export class CreateExperimentDto {
  @IsString()
  @ApiModelProperty()
  readonly conclusions: string;
}

export class UpdateExperimentDto {
  @IsString()
  @ApiModelProperty()
  readonly conclusions: string;
}
