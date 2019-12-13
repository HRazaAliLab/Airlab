import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CloneDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly proteinId: number;

  @ApiProperty()
  readonly speciesId: number;

  @ApiProperty()
  readonly prefferedTagId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly isotype: string;

  @ApiProperty()
  readonly epitope: string;

  @ApiProperty()
  readonly isPhospho: boolean;

  @ApiProperty()
  readonly isPolyclonal: boolean;

  @ApiProperty()
  readonly reactivity: number[];

  @ApiProperty()
  readonly application: object;

  @ApiProperty()
  readonly isDeleted: boolean;

  @ApiProperty()
  readonly isPublic: boolean;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;

  @ApiPropertyOptional()
  readonly updatedAt: string;
}

export class CreateCloneDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly proteinId: number;

  @IsInt()
  @ApiProperty()
  readonly speciesId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly isotype: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly epitope: string;

  @IsBoolean()
  @ApiProperty()
  readonly isPhospho: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isPolyclonal: boolean;

  @IsArray()
  @ApiProperty()
  readonly reactivity: number[];

  @ApiProperty()
  readonly application: object;
}

export class UpdateCloneDto {
  @IsInt()
  @ApiProperty()
  readonly proteinId: number;

  @IsInt()
  @ApiProperty()
  readonly speciesId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly isotype: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly epitope: string;

  @IsBoolean()
  @ApiProperty()
  readonly isPhospho: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isPolyclonal: boolean;

  @IsArray()
  @ApiProperty()
  readonly reactivity: number[];

  @ApiProperty()
  readonly application: object;
}
