import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {
  CreateValidationDto,
  UpdateValidationDto,
  UploadValidationDto,
  ValidationDto,
} from "@airlab/shared/lib/validation/dto";
import { MemberService } from "../member/member.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { existsSync } from "fs";
import { pseudoRandomBytes } from "crypto";
import { extname } from "path";
import { ValidationFileService } from "../validationFile/validationFile.service";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require("multer");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
  destination: function (
    req,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    cb: (error: Error | null, destination: string) => void
  ) {
    const groupId = req.body.groupId;
    const validationId = req.params.id;
    const destination = `/data/groups/${groupId}/uploads/validation/${validationId}`;
    if (!existsSync(destination)) {
      mkdirp.sync(destination);
    }
    cb(null, destination);
  },
  filename: function (
    req,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    cb: (error: Error | null, filename: string) => void
  ) {
    const ext = extname(file.originalname);
    pseudoRandomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString("hex") + ext);
    });
  },
});

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("validations")
@ApiBearerAuth()
export class ValidationController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly memberService: MemberService,
    private readonly validationFileService: ValidationFileService
  ) {}

  @Post("validations")
  @ApiCreatedResponse({ description: "Create entity.", type: ValidationDto })
  async create(@Request() req, @Body() params: CreateValidationDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.validationService.create({ ...params, createdBy: member.id });
  }

  @Get("validations/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: ValidationDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.validationService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("validations/:id")
  @ApiOkResponse({ description: "Updated entity.", type: ValidationDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateValidationDto) {
    const item = await this.validationService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.validationService.update(id, params);
  }

  @Patch("validations/:id/archive")
  @ApiOperation({ summary: "Set archive state for the entity." })
  @ApiOkResponse({ type: ValidationDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateStateDto) {
    const item = await this.validationService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.validationService.updateArchiveState(id, params);
  }

  @Delete("validations/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.validationService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.validationService.deleteById(id);
  }

  @Get("groups/:groupId/validations")
  @ApiOkResponse({
    description: "Find all validations belonging to the group.",
    type: ValidationDto,
    isArray: true,
  })
  async getGroupValidations(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.validationService.getGroupValidations(groupId);
  }

  @Post("validations/:id/upload")
  @ApiConsumes("multipart/form-data")
  // @ApiImplicitFile({ name: "file", required: true })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: storage,
      preservePath: true,
      fileFilter(
        req,
        file: {
          fieldname: string;
          originalname: string;
          encoding: string;
          mimetype: string;
          size: number;
          destination: string;
          filename: string;
          path: string;
          buffer: Buffer;
        },
        cb: (error: Error | null, acceptFile: boolean) => void
      ): void {
        cb(null, true);
      },
      limits: {
        fileSize: 1000000 * 100, // 100 MB in bytes
      },
    })
  )
  async upload(@Param("id") id: number, @Request() req, @UploadedFile() file, @Body() params: UploadValidationDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, Number(params.groupId));
    const extension = extname(file.originalname);
    await this.validationService.clearCache(Number(params.groupId));
    const fileEntity = await this.validationFileService.create({
      validationId: id,
      createdBy: member.id,
      name: file.originalname,
      extension: extension.substring(1),
      size: file.size,
      hash: file.filename.replace(extension, ""),
    });
  }
}
