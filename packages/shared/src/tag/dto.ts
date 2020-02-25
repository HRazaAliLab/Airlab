import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TagDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly isMetal: boolean;

  @ApiProperty()
  readonly isFluorophore: boolean;

  @ApiPropertyOptional()
  readonly mw: number | null;

  @ApiPropertyOptional()
  readonly emission: number | null;

  @ApiPropertyOptional()
  readonly excitation: number | null;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateTagDto {
  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsBoolean()
  @ApiProperty()
  readonly isMetal: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isFluorophore: boolean;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly mw: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly emission: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly excitation: number | null;
}

export class UpdateTagDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsBoolean()
  @ApiProperty()
  readonly isMetal: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isFluorophore: boolean;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly mw: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly emission: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly excitation: number | null;
}
