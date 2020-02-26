import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
  readonly status: string;

  @ApiProperty()
  readonly purpose: string;

  @ApiProperty()
  readonly link: string;

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
  readonly isLow: boolean;

  @ApiProperty()
  readonly isDeleted: boolean;

  @ApiProperty()
  readonly meta: object;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class CreateLotDto {
  readonly createdBy?: number;
  readonly status?: string;

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
  readonly link: string | null;

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
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly status?: string;

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
  readonly link: string | null;

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
