import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TagDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiPropertyOptional()
  readonly mw: number | null;

  @ApiProperty()
  readonly isFluorophore: boolean;

  @ApiProperty()
  readonly isMetal: boolean;

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

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly mw: number | null;

  @IsBoolean()
  @ApiProperty()
  readonly isFluorophore: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isMetal: boolean;
}

export class UpdateTagDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly mw: number | null;

  @IsBoolean()
  @ApiProperty()
  readonly isFluorophore: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isMetal: boolean;
}
