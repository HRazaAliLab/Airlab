import { IsInt, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SpeciesDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly acronym: string;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: object;
}

export class CreateSpeciesDto {
  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly acronym: string;
}

export class UpdateSpeciesDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly acronym: string;
}
