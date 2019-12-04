import { IsBoolean, IsEmail, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class UserDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly isActive: boolean;

  @ApiModelProperty()
  readonly isAdmin: boolean;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;
}

export class ProfileDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly isAdmin: boolean;
}

export class UpdateProfileDto {
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdatePasswordDto {
  @IsString()
  @ApiModelProperty()
  readonly password: string;
}

export class CreateUserDto {
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly isAdmin: boolean;

  @IsString()
  @ApiModelPropertyOptional()
  readonly password: string;
}
