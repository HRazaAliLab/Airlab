import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class FileDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly extension: string;

  @ApiModelProperty()
  readonly hash: string;

  @ApiModelProperty()
  readonly partId: number;

  @ApiModelProperty()
  readonly url: string;

  @ApiModelProperty()
  readonly size: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly catchedInfo: string;
}

export class CreateFileDto {
  @IsString()
  @ApiModelProperty()
  readonly url: string;
}

export class UpdateFileDto {
  @IsString()
  @ApiModelProperty()
  readonly url: string;
}
