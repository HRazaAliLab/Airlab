import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CloneDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly bindingRegion: string;

  @ApiModelProperty()
  readonly epitopeId: number;

  @ApiModelProperty()
  readonly isotype: string;

  @ApiModelProperty()
  readonly isPhospho: boolean;

  @ApiModelProperty()
  readonly isPolyclonal: boolean;

  @ApiModelProperty()
  readonly reactivity: string;

  @ApiModelProperty()
  readonly application: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly proteinId: number;

  @ApiModelProperty()
  readonly speciesHost: string;

  @ApiModelProperty()
  readonly public: boolean;

  @ApiModelProperty()
  readonly preferred: boolean;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly catchedInfo: string;
}

export class CreateCloneDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}

export class UpdateCloneDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
