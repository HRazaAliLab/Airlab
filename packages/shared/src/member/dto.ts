import { IsBoolean, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MemberDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly groupId: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly role: number;

  @ApiProperty()
  readonly activationKey: string;

  @ApiProperty()
  readonly isActive: boolean;

  @ApiProperty()
  readonly allPanels: boolean;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class CreateMemberDto {
  @IsInt()
  @ApiProperty()
  readonly groupId: number;

  @IsInt()
  @ApiProperty()
  readonly userId: number;

  @IsInt()
  @ApiProperty()
  readonly role: number;

  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly allPanels: boolean;
}

export class UpdateMemberDto {
  @IsInt()
  @ApiProperty()
  readonly role: number;

  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly allPanels: boolean;
}
