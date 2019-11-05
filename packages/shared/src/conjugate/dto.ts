import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class ConjugateDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly cellsUsedForValidation: string;

  @ApiModelProperty()
  readonly concentration: string;

  @ApiModelProperty()
  readonly contributorId: string;

  @ApiModelProperty()
  readonly cytobankLink: string;

  @ApiModelProperty()
  readonly cytofStainingConc: string;

  @ApiModelProperty()
  readonly dateOfLabeling: string;

  @ApiModelProperty()
  readonly labbookRef: string;

  @ApiModelProperty()
  readonly lotId: number;

  @ApiModelProperty()
  readonly tagId: number;

  @ApiModelProperty()
  readonly workingCondition: string;

  @ApiModelProperty()
  readonly bbTubeNumber: number;

  @ApiModelProperty()
  readonly relabeled: boolean;

  @ApiModelProperty()
  readonly tubPlaceId: number;

  @ApiModelProperty()
  readonly tubFinishedAt: string;

  @ApiModelProperty()
  readonly tubFinishedBy: number;

  @ApiModelProperty()
  readonly tubIsLow: boolean;

  @ApiModelProperty()
  readonly deleted: boolean;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly catchedInfo: string;
}

export class CreateConjugateDto {
  @IsString()
  @ApiModelProperty()
  readonly workingCondition: string;
}

export class UpdateConjugateDto {
  @IsString()
  @ApiModelProperty()
  readonly workingCondition: string;
}
