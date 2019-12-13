import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ReagentDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly providerId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly reference: string;

  @ApiProperty()
  readonly isDeleted: boolean;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateReagentDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly providerId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly reference: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly meta: object | null;
}

export class UpdateReagentDto {
  @IsInt()
  @ApiProperty()
  readonly providerId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly reference: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly meta: object | null;
}
