import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class GroupDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly acceptRequests: boolean;

  @ApiModelPropertyOptional()
  readonly institution: string;

  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @ApiModelPropertyOptional()
  readonly catchedInfo: string;

  @ApiModelPropertyOptional()
  readonly url: string;
}

export class CreateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly acceptRequests: boolean;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @IsUrl()
  @ApiModelPropertyOptional()
  readonly url: string;
}

export class UpdateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly acceptRequests: boolean;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly coordinates: string;

  @IsUrl()
  @ApiModelPropertyOptional()
  readonly url: string;
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
