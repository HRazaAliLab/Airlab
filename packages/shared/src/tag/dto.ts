import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TagStatus } from "./TagStatus";

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

  @ApiProperty()
  readonly isEnzyme: boolean;

  @ApiProperty()
  readonly isBiotin: boolean;

  @ApiProperty()
  readonly isOther: boolean;

  @ApiProperty()
  readonly status: number;

  @ApiPropertyOptional()
  readonly description: string | null;

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

  @IsBoolean()
  @ApiProperty()
  readonly isEnzyme: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isBiotin: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isOther: boolean;

  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  readonly status: TagStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

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

  @IsBoolean()
  @ApiProperty()
  readonly isEnzyme: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isBiotin: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isOther: boolean;

  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  readonly status: TagStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

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
