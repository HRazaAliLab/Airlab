import { IsBoolean, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ReagentDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly providerId: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly reference: string;

  @ApiModelProperty()
  readonly isDeleted: boolean;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateReagentDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly reference: string;
}

export class UpdateReagentDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly reference: string;

  @IsBoolean()
  @ApiModelPropertyOptional()
  readonly isDeleted: boolean;
}
