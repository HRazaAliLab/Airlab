import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class UserDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly active: boolean;
}

export class CreateUserDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateUserDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
