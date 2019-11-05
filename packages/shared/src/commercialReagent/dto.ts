import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CommercialReagentDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly providerId: number;

  @ApiModelProperty()
  readonly reference: string;

  @ApiModelProperty()
  readonly isFavorite: boolean;

  @ApiModelProperty()
  readonly catchedInfo: string;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;
}

export class CreateCommercialReagentDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateCommercialReagentDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
