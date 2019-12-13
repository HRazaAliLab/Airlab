import { IsBoolean, IsEmail, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly isActive: boolean;

  @ApiProperty()
  readonly isAdmin: boolean;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class ProfileDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly isAdmin: boolean;
}

export class UpdateProfileDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  readonly password: string;
}

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isAdmin: boolean;

  @IsString()
  @ApiPropertyOptional()
  readonly password: string;
}
