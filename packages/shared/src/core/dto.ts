import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStateDto {
  @IsBoolean()
  @ApiProperty()
  readonly state: boolean;
}
