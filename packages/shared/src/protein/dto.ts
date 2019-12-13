import { IsInt, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProteinDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly name: string;

  @ApiPropertyOptional()
  readonly description: string;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateProteinDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly description: string;
}

export class UpdateProteinDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly description: string;
}
