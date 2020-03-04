import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ConjugateStatus } from "./ConjugateStatus";

export class ConjugateDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly labeledBy: number;

  @ApiProperty()
  readonly finishedBy: number;

  @ApiProperty()
  readonly lotId: number;

  @ApiProperty()
  readonly tagId: number;

  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly tubeNumber: number;

  @ApiProperty()
  readonly concentration: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly isArchived: boolean;

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
  @IsOptional()
  @ApiPropertyOptional()
  readonly labeledBy: number | null;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentration: number | null;

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
  @IsOptional()
  @ApiPropertyOptional()
  readonly labeledBy: number | null;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentration: number | null;

  @IsString()
  @ApiProperty()
  readonly description: string;
}

export class UpdateConjugateStatusDto {
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  readonly status: ConjugateStatus;
}
