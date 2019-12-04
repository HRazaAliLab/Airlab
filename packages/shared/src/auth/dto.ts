import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class JwtPayloadDto {
  userId: number;
}

export class ResetPasswordDto {
  @IsString()
  @ApiModelProperty()
  readonly newPassword: string;

  @IsString()
  @ApiModelProperty()
  readonly token: string;
}
