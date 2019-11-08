import { IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class FileDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly extension: string;

  @ApiModelProperty()
  readonly size: number;

  @ApiModelProperty()
  readonly hash: string;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelPropertyOptional()
  readonly createdAt: string;
}

export class CreateFileDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateFileDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
