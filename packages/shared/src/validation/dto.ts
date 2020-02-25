import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ValidationDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly cloneId: number;

  @ApiProperty()
  readonly lotId?: number;

  @ApiProperty()
  readonly conjugateId?: number;

  @ApiProperty()
  readonly speciesId?: number;

  @ApiProperty()
  readonly fileId: number;

  @ApiProperty()
  readonly application: number;

  @ApiProperty()
  readonly positiveControl: string;

  @ApiProperty()
  readonly negativeControl: string;

  @ApiProperty()
  readonly incubationConditions: string;

  @ApiProperty()
  readonly concentration: string;

  @ApiProperty()
  readonly concentrationUnit: string;

  @ApiProperty()
  readonly tissue: string;

  @ApiProperty()
  readonly fixation: number;

  @ApiProperty()
  readonly fixationNotes: string;

  @ApiProperty()
  readonly notes: string;

  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly antigenRetrievalType: string;

  @ApiProperty()
  readonly antigenRetrievalTime: string;

  @ApiProperty()
  readonly antigenRetrievalTemperature: string;

  @ApiProperty()
  readonly saponin: boolean | null;

  @ApiProperty()
  readonly saponinConcentration: string | null;

  @ApiProperty()
  readonly methanolTreatment: boolean | null;

  @ApiProperty()
  readonly methanolTreatmentConcentration: string | null;

  @ApiProperty()
  readonly surfaceStaining: boolean | null;

  @ApiProperty()
  readonly surfaceStainingConcentration: string | null;

  @ApiProperty()
  readonly meta: object;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class CreateValidationDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly cloneId: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lotId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly conjugateId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly speciesId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fileId: number | null;

  @IsInt()
  @ApiProperty()
  readonly application: number | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly positiveControl: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly negativeControl: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly incubationConditions: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentration: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentrationUnit: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly tissue: string | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fixation: number | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fixationNotes: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly notes: string | null;

  @IsInt()
  @ApiProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalType: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalTime: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalTemperature: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly saponin: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly saponinConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly methanolTreatment: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly methanolTreatmentConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly surfaceStaining: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly surfaceStainingConcentration: string | null;
}

export class UpdateValidationDto {
  @IsInt()
  @ApiProperty()
  readonly cloneId: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lotId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly conjugateId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly speciesId: number | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fileId: number | null;

  @IsInt()
  @ApiProperty()
  readonly application: number | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly positiveControl: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly negativeControl: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly incubationConditions: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentration: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentrationUnit: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly tissue: string | null;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fixation: number | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fixationNotes: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly notes: string | null;

  @IsInt()
  @ApiProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalType: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalTime: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly antigenRetrievalTemperature: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly saponin: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly saponinConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly methanolTreatment: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly methanolTreatmentConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly surfaceStaining: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly surfaceStainingConcentration: string | null;
}

export class UploadValidationDto {
  @IsString()
  @ApiProperty()
  readonly groupId: string;
}
