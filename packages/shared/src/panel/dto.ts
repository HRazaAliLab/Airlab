import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PanelElementDataDto {
  @IsInt()
  @ApiProperty()
  readonly conjugateId: number;

  @IsInt()
  @ApiProperty()
  readonly dilutionType: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly concentration?: number;
}

export class PanelDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly isFluorophore: boolean;

  @ApiProperty()
  readonly isLocked: boolean;

  @ApiProperty()
  readonly application: number;

  @ApiProperty()
  readonly meta: object;

  @ApiProperty()
  readonly isDeleted: boolean;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;

  @ApiProperty()
  readonly elements: PanelElementDataDto[];
}

export class CreatePanelDto {
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

  @IsBoolean()
  @ApiProperty()
  readonly isFluorophore: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isLocked: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  readonly application: number | null;

  @IsArray()
  @ApiProperty()
  readonly elements: PanelElementDataDto[];
}

export class UpdatePanelDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isFluorophore?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isLocked?: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  readonly application?: number | null;

  @IsArray()
  @ApiProperty()
  elements: PanelElementDataDto[];
}

export class DuplicatePanelDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;
}
