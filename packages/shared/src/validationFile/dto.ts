import { IsInt, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ValidationFileDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly validationId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly hash: string;

  @ApiProperty()
  readonly size: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly extension: string;

  @ApiPropertyOptional()
  readonly description: string;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateValidationFileDto {
  readonly createdBy?: number;

  @IsString()
  @ApiProperty()
  readonly hash: string;

  @IsInt()
  @ApiProperty()
  readonly validationId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly extension: string;

  @IsInt()
  @ApiProperty()
  readonly size: number;
}

export class UpdateValidationFileDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
}
