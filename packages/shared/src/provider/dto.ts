import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProviderDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly url: string;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateProviderDto {
  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;
}

export class UpdateProviderDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string | null;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;
}
