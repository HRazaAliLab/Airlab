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
  readonly embedding: string;

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
  readonly saponin?: boolean;

  @ApiModelProperty()
  readonly saponinConcentration?: string;

  @ApiModelProperty()
  readonly methanolTreatment?: boolean;

  @ApiModelProperty()
  readonly methanolTreatmentConcentration?: string;

  @ApiModelProperty()
  readonly surfaceStaining?: boolean;

  @ApiModelProperty()
  readonly surfaceStainingConcentration?: string;

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
  readonly cloneId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly lotId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly conjugateId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly speciesId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fileId: number;

  @IsInt()
  @ApiModelProperty()
  readonly application: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly positiveControl: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly negativeControl: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly incubationConditions: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentration: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentrationUnit: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly tissue: string;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixation: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly embedding: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly notes: string;

  @IsInt()
  @ApiModelProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalType: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTime: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTemperature: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponin: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponinConcentration: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatment: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatmentConcentration: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStaining: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStainingConcentration: string;
}

export class UpdateValidationDto {
  @IsInt()
  @ApiModelProperty()
  readonly cloneId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly lotId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly conjugateId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly speciesId: number;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fileId: number;

  @IsInt()
  @ApiModelProperty()
  readonly application: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly positiveControl: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly negativeControl: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly incubationConditions: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentration: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly concentrationUnit: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly tissue: string;

  @IsInt()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly fixation: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly embedding: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly notes: string;

  @IsInt()
  @ApiModelProperty()
  readonly status: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalType: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTime: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly antigenRetrievalTemperature: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponin: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly saponinConcentration: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatment: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly methanolTreatmentConcentration: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStaining: boolean;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly surfaceStainingConcentration: string;
}
