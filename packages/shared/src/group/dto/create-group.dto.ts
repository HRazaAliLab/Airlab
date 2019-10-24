import { IsBoolean, IsString } from "class-validator";

export class CreateGroupDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly institution: string;

  @IsString()
  readonly coordinates: string;

  @IsString()
  readonly catchedInfo: string;

  @IsString()
  readonly url: string;

  @IsBoolean()
  readonly acceptRequests: boolean;
}
