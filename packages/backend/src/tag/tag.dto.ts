import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class TagDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly mw: string;

  @ApiModelProperty()
  readonly emission: string;

  @ApiModelProperty()
  readonly excitation: string;

  @ApiModelProperty()
  readonly isFluorphore: boolean;

  @ApiModelProperty()
  readonly isMetal: boolean;
}

export class CreateTagDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateTagDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
