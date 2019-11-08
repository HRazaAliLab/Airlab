import { IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class SpeciesDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly acronym: string;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: object;
}

export class CreateSpeciesDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly acronym: string;
}

export class UpdateSpeciesDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly acronym: string;
}
