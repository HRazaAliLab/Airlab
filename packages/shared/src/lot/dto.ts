import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class LotDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly reagentId: number;

  @ApiModelProperty()
  readonly providerId: number;

  @ApiModelProperty()
  readonly cloneId: number;

  @ApiModelProperty()
  readonly requestedBy: number;

  @ApiModelProperty()
  readonly approvedBy: number;

  @ApiModelProperty()
  readonly orderedBy: number;

  @ApiModelProperty()
  readonly receivedBy: number;

  @ApiModelProperty()
  readonly finishedBy: number;

  @ApiModelProperty()
  readonly number: string;

  @ApiModelProperty()
  readonly status: string;

  @ApiModelProperty()
  readonly purpose: string;

  @ApiModelProperty()
  readonly link: string;

  @ApiModelProperty()
  readonly requestedAt: string;

  @ApiModelProperty()
  readonly approvedAt: string;

  @ApiModelProperty()
  readonly orderedAt: string;

  @ApiModelProperty()
  readonly receivedAt: string;

  @ApiModelProperty()
  readonly finishedAt: string;

  @ApiModelProperty()
  readonly isLow: boolean;

  @ApiModelProperty()
  readonly isDeleted: boolean;

  @ApiModelProperty()
  readonly meta: object;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;
}

export class CreateLotDto {
  @IsString()
  @ApiModelProperty()
  readonly status: string;
}

export class UpdateLotDto {
  @IsString()
  @ApiModelProperty()
  readonly status: string;
}
