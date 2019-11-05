import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class ReagentInstanceDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly commertialReagentId: number;

  @ApiModelProperty()
  readonly status: string;

  @ApiModelProperty()
  readonly requestedBy: number;

  @ApiModelProperty()
  readonly orderedBy: number;

  @ApiModelProperty()
  readonly approvedBy: number;

  @ApiModelProperty()
  readonly receivedBy: number;

  @ApiModelProperty()
  readonly purpose: string;

  @ApiModelProperty()
  readonly tubFinishedBy: number;

  @ApiModelProperty()
  readonly requestedAt: string;

  @ApiModelProperty()
  readonly approvedAt: string;

  @ApiModelProperty()
  readonly orderedAt: string;

  @ApiModelProperty()
  readonly receivedAt: string;

  @ApiModelProperty()
  readonly tubFinishedAt: string;

  @ApiModelProperty()
  readonly catchedInfo: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly tubPlaceId: number;

  @ApiModelProperty()
  readonly deleted: boolean;

  @ApiModelProperty()
  readonly inactivatedAt: string;

  @ApiModelProperty()
  readonly inactivatedBy: number;

  @ApiModelProperty()
  readonly lotNumber: string;

  @ApiModelProperty()
  readonly lotCloneId: number;

  @ApiModelProperty()
  readonly lotConcentration: string;

  @ApiModelProperty()
  readonly lotExpirationDate: string;

  @ApiModelProperty()
  readonly lotProviderId: number;

  @ApiModelProperty()
  readonly lotDataSheetLink: string;

  @ApiModelProperty()
  readonly tubIsLow: boolean;
}

export class CreateReagentInstanceDto {
  @IsString()
  @ApiModelProperty()
  readonly status: string;
}

export class UpdateReagentInstanceDto {
  @IsString()
  @ApiModelProperty()
  readonly status: string;
}
