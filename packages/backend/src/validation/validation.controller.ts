import {
  Body,
  Controller,
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
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";
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

@ApiUseTags("validation")
@Controller("validation")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ValidationController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly groupUserService: GroupUserService,
    private readonly validationFileService: ValidationFileService
  ) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ValidationDto, isArray: true })
  findAll() {
    return this.validationService.findAll();
  }

  @Get("getAllValidationsForGroup")
  @ApiCreatedResponse({ description: "Find all validations for the group.", type: ValidationDto, isArray: true })
  getAllValidationsForGroup(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.validationService.getAllValidationsForGroup(user.userId);
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ValidationDto })
  findById(@Param("id") id: number) {
    return this.validationService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ValidationDto })
  async create(@Request() req, @Body() params: CreateValidationDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.validationService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ValidationDto })
  async update(@Param("id") id: number, @Body() params: UpdateValidationDto) {
    return this.validationService.update(id, params);
  }

  @Post(":id/upload")
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
    const groupId = Number(params.groupId);
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, groupId);
    const extension = extname(file.originalname);
    const fileEntity = await this.validationFileService.create({
      validationId: id,
      createdBy: groupUser.id,
      name: file.originalname,
      extension: extension.substring(1),
      size: file.size,
      hash: file.filename.replace(extension, ""),
    });
  }
}
