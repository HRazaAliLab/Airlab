import { IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class SpeciesProteinDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly proteinId: number;

  @ApiModelProperty()
  readonly speciesId: number;
}

export class CreateSpeciesProteinDto {
  @IsString()
  @ApiModelPropertyOptional()
  readonly catchedInfo: string;
}

export class UpdateSpeciesProteinDto {
  @IsString()
  @ApiModelPropertyOptional()
  readonly catchedInfo: string;
}
