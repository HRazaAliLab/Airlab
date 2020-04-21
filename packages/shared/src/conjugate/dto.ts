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

  @ApiPropertyOptional()
  readonly description: string | null;

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

  @ApiPropertyOptional()
  readonly customId: string;
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
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly customId: string | null;
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
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly customId: string | null;
}

export class UpdateConjugateStatusDto {
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  readonly status: ConjugateStatus;
}
