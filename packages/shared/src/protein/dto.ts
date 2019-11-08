import { IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ProteinDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateProteinDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateProteinDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
