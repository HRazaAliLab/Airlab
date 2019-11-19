import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ValidationDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly cloneId: number;

  @ApiModelProperty()
  readonly lotId: number;

  @ApiModelProperty()
  readonly conjugateId: number;

  @ApiModelProperty()
  readonly speciesId: number;

  @ApiModelProperty()
  readonly fileId: number;

  @ApiModelProperty()
  readonly application: number;

  @ApiModelProperty()
  readonly positiveControl: string;

  @ApiModelProperty()
  readonly negativeControl: string;

  @ApiModelProperty()
  readonly incubationConditions: string;

  @ApiModelProperty()
  readonly concentration: string;

  @ApiModelProperty()
  readonly concentrationUnit: string;

  @ApiModelProperty()
  readonly tissue: string;

  @ApiModelProperty()
  readonly fixation: number;

  @ApiModelProperty()
  readonly fixationNotes: string;

  @ApiModelProperty()
  readonly notes: string;

  @ApiModelProperty()
  readonly status: number;

  @ApiModelProperty()
  readonly antigenRetrievalType: string;

  @ApiModelProperty()
  readonly antigenRetrievalTime: string;

  @ApiModelProperty()
  readonly antigenRetrievalTemperature: string;

  @ApiModelProperty()
  readonly saponin: boolean | null;

  @ApiModelProperty()
  readonly saponinConcentration: string | null;

  @ApiModelProperty()
  readonly methanolTreatment: boolean | null;

  @ApiModelProperty()
  readonly methanolTreatmentConcentration: string | null;

  @ApiModelProperty()
  readonly surfaceStaining: boolean | null;

  @ApiModelProperty()
  readonly surfaceStainingConcentration: string | null;

  @ApiModelProperty()
  readonly meta: object;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;
}

export class CreateValidationDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly cloneId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly lotId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly conjugateId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly speciesId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fileId: number | null;

  @IsInt()
  @ApiModelProperty()
  readonly application: number | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly positiveControl: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly negativeControl: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly incubationConditions: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentration: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentrationUnit: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly tissue: string | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixation: number | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixationNotes: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly notes: string | null;

  @IsInt()
  @ApiModelProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalType: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTime: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTemperature: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponin: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponinConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatment: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatmentConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStaining: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStainingConcentration: string | null;
}

export class UpdateValidationDto {
  @IsInt()
  @ApiModelProperty()
  readonly cloneId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly lotId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly conjugateId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly speciesId: number | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fileId: number | null;

  @IsInt()
  @ApiModelProperty()
  readonly application: number | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly positiveControl: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly negativeControl: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly incubationConditions: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentration: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentrationUnit: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly tissue: string | null;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixation: number | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixationNotes: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly notes: string | null;

  @IsInt()
  @ApiModelProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalType: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTime: string | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTemperature: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponin: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponinConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatment: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatmentConcentration: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStaining: boolean | null;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStainingConcentration: string | null;
}

export class UploadValidationDto {
  @IsString()
  @ApiModelProperty()
  readonly groupId: string;
}
