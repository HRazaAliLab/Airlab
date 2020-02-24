import { IsInt, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConjugateDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly lotId: number;

  @ApiProperty()
  readonly tagId: number;

  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly tubeNumber: number;

  @ApiProperty()
  readonly concentration: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly isDeleted: boolean;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiProperty()
  readonly labeledAt: string;

  @ApiPropertyOptional()
  readonly createdAt: string;

  @ApiPropertyOptional()
  readonly updatedAt: string;
}

export class CreateConjugateDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly lotId: number;

  @IsInt()
  @ApiProperty()
  readonly tagId: number;

  @IsInt()
  @ApiProperty()
  readonly tubeNumber: number;

  @IsString()
  @ApiProperty()
  readonly concentration: string;

  @IsString()
  @ApiProperty()
  readonly description: string;
}

export class UpdateConjugateDto {
  @IsInt()
  @ApiProperty()
  readonly lotId: number;

  @IsInt()
  @ApiProperty()
  readonly tagId: number;

  @IsInt()
  @ApiProperty()
  readonly tubeNumber: number;

  @IsString()
  @ApiProperty()
  readonly concentration: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsInt()
  @ApiProperty()
  readonly status: number;
}
