import { IsBoolean, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class CreateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly catchedInfo: string;

  @IsUrl()
  @ApiModelPropertyOptional()
  readonly url: string;

  @IsBoolean()
  @ApiModelPropertyOptional()
  readonly acceptRequests: boolean;
}

export class UpdateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly catchedInfo: string;

  @IsUrl()
  @ApiModelPropertyOptional()
  readonly url: string;

  @IsBoolean()
  @ApiModelPropertyOptional()
  readonly acceptRequests: boolean;
}
