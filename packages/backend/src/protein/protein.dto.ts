import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ProteinDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelPropertyOptional()
  readonly description: string;

  @ApiModelPropertyOptional()
  readonly kd: number;

  @ApiModelPropertyOptional()
  readonly catchedInfo: string;

  @ApiModelPropertyOptional()
  readonly proNcbiGeneId: string;

  @ApiModelPropertyOptional()
  readonly proSwissDbId: string;

  @ApiModelPropertyOptional()
  readonly openBisPermId: string;

  @ApiModelPropertyOptional()
  readonly openBisCode: string;
}

export class CreateProteinDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly description: string;
}

export class UpdateProteinDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly description: string;
}
