import { IsInt, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ConjugateDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly groupId: number;

  @ApiModelProperty()
  readonly createdBy: number;

  @ApiModelProperty()
  readonly lotId: number;

  @ApiModelProperty()
  readonly tagId: number;

  @ApiModelProperty()
  readonly finishedBy: number;

  @ApiModelProperty()
  readonly finishedAt: string;

  @ApiModelProperty()
  readonly tubeNumber: number;

  @ApiModelProperty()
  readonly concentration: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly isDeleted: boolean;

  @ApiModelPropertyOptional()
  readonly meta: object;

  @ApiModelProperty()
  readonly labeledAt: string;

  @ApiModelPropertyOptional()
  readonly createdAt: string;

  @ApiModelPropertyOptional()
  readonly updatedAt: string;
}

export class CreateConjugateDto {
  readonly createdBy?: number;

  @IsInt()
  @ApiModelProperty()
  readonly groupId: number;

  @IsInt()
  @ApiModelProperty()
  readonly lotId: number;

  @IsInt()
  @ApiModelProperty()
  readonly tagId: number;

  @IsString()
  @ApiModelProperty()
  readonly concentration: string;

  @IsString()
  @ApiModelProperty()
  readonly description: string;
}

export class UpdateConjugateDto {
  @IsInt()
  @ApiModelProperty()
  readonly lotId: number;

  @IsInt()
  @ApiModelProperty()
  readonly tagId: number;

  @IsString()
  @ApiModelProperty()
  readonly concentration: string;

  @IsString()
  @ApiModelProperty()
  readonly description: string;
}
