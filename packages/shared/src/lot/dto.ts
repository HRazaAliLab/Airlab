import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LotStatus } from "./LotStatus";

export class LotDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly createdBy: number;

  @ApiProperty()
  readonly cloneId: number;

  @ApiProperty()
  readonly providerId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly reference: string;

  @ApiProperty()
  readonly requestedBy: number;

  @ApiProperty()
  readonly approvedBy: number;

  @ApiProperty()
  readonly orderedBy: number;

  @ApiProperty()
  readonly receivedBy: number;

  @ApiProperty()
  readonly finishedBy: number;

  @ApiProperty()
  readonly number: string;

  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly purpose: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly price: string;

  @ApiProperty()
  readonly note: string;

  @ApiProperty()
  readonly requestedAt: string;

  @ApiProperty()
  readonly approvedAt: string;

  @ApiProperty()
  readonly orderedAt: string;

  @ApiProperty()
  readonly receivedAt: string;

  @ApiProperty()
  readonly finishedAt: string;

  @ApiProperty()
  readonly isArchived: boolean;

  @ApiProperty()
  readonly meta: object;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class CreateLotDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly cloneId: number;

  @IsInt()
  @ApiProperty()
  readonly providerId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly reference: string;

  @IsString()
  @ApiProperty()
  readonly number: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly purpose: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly price?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly note?: string | null;
}

export class UpdateLotDto {
  @IsInt()
  @ApiProperty()
  readonly cloneId: number;

  @IsInt()
  @ApiProperty()
  readonly providerId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly reference: string;

  @IsString()
  @ApiProperty()
  readonly number: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly purpose: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly price?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly note?: string | null;
}

export class UpdateLotStatusDto {
  @IsInt()
  @Min(0)
  @Max(6)
  @ApiProperty()
  readonly status: LotStatus;
}
