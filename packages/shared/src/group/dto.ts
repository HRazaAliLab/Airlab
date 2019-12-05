import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class GroupDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelPropertyOptional()
  readonly institution: string;

  @ApiModelPropertyOptional()
  readonly url: string;

  @ApiModelProperty()
  readonly isOpen: boolean;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsUrl()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly url: string | null;

  @IsBoolean()
  @ApiModelProperty()
  readonly isOpen: boolean;
}

export class UpdateGroupDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelPropertyOptional()
  readonly institution: string;

  @IsUrl()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly url: string | null;

  @IsBoolean()
  @ApiModelProperty()
  readonly isOpen: boolean;
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
