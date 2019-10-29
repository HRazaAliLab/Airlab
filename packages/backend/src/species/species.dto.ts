import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class SpeciesDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly acronym: string;
}

export class CreateSpeciesDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateSpeciesDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
