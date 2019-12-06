import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiImplicitFile, ApiUseTags } from "@nestjs/swagger";
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require("multer");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
  destination: function(
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
  filename: function(
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
    pseudoRandomBytes(16, function(err, raw) {
      cb(err, err ? undefined : raw.toString("hex") + ext);
    });
  },
});

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("validations")
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
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ValidationDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.validationService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("validations/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ValidationDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateValidationDto) {
    const item = await this.validationService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.validationService.update(id, params);
  }

  @Delete("validations/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.validationService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.validationService.deleteById(id);
  }

  @Get("groups/:groupId/validations")
  @ApiCreatedResponse({
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
  @ApiImplicitFile({ name: "file", required: true })
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
