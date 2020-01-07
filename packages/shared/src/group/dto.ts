import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiPropertyOptional()
  readonly institution: string;

  @ApiPropertyOptional()
  readonly url: string;

  @ApiProperty()
  readonly isOpen: boolean;

  @ApiPropertyOptional()
  readonly meta: object;

  @ApiPropertyOptional()
  readonly createdAt: string;
}

export class CreateGroupDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly institution: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;

  @IsBoolean()
  @ApiProperty()
  readonly isOpen: boolean;
}

export class UpdateGroupDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiPropertyOptional()
  readonly institution: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  readonly url: string | null;

  @IsBoolean()
  @ApiProperty()
  readonly isOpen: boolean;
}

export class InviteDto {
  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly userId: number;

  @IsString()
  @ApiProperty()
  readonly token: string;
}
