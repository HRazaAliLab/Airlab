import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class MemberDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly userId: number;

  @ApiModelProperty()
  readonly role: number;

  @ApiModelProperty()
  readonly activationKey: string;

  @ApiModelProperty()
  readonly isActive: boolean;

  @ApiModelProperty()
  readonly canOrder: boolean;

  @ApiModelProperty()
  readonly canErase: boolean;

  @ApiModelProperty()
  readonly canFinances: boolean;

  @ApiModelProperty()
  readonly canPanels: boolean;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;
}

export class CreateMemberDto {
  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly userId: number;

  @IsInt()
  @ApiModelProperty()
  readonly role: number;

  @IsBoolean()
  @ApiModelProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canOrder: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canErase: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canFinances: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canPanels: boolean;
}

export class UpdateMemberDto {
  @IsInt()
  @ApiModelProperty()
  readonly role: number;

  @IsBoolean()
  @ApiModelProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canOrder: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canErase: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canFinances: boolean;

  @IsBoolean()
  @ApiModelProperty()
  readonly canPanels: boolean;
}
