import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
  readonly details: object[];

  @ApiProperty()
  readonly isFluor: boolean;

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
  readonly isFluor: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isLocked: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  readonly application: number | null;

  @IsOptional()
  @ApiPropertyOptional()
  readonly details: object[] | null;
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
  readonly isFluor?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isLocked?: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  readonly application?: number | null;

  @IsOptional()
  @ApiPropertyOptional()
  readonly details?: object[] | null;
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
