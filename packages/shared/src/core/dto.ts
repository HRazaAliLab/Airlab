import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateArchiveStateDto {
  @IsBoolean()
  @ApiProperty()
  readonly isArchived: boolean;
}
