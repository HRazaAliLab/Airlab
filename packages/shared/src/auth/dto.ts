import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class JwtPayloadDto {
  userId: number;
  isAdmin: boolean;
}

export class ResetPasswordDto {
  @IsString()
  @ApiProperty()
  readonly newPassword: string;

  @IsString()
  @ApiProperty()
  readonly token: string;
}
