import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class GroupDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelPropertyOptional()
  readonly institution: string;

  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @ApiModelPropertyOptional()
  readonly catchedInfo: string;

  @ApiModelPropertyOptional()
  readonly createdBy: number;

  @ApiModelPropertyOptional()
  readonly url: string;

  @ApiModelPropertyOptional()
  readonly acceptRequests: boolean;
}

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

export class RequestJoinGroupDto {
  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly userId: number;
}

export class InviteDto {
  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly userId: number;

  @IsString()
  @ApiModelProperty()
  readonly token: string;
}
