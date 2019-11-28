import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ValidationFileService } from "./validationFile.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {
  CreateValidationFileDto,
  ValidationFileDto,
  UpdateValidationFileDto,
} from "@airlab/shared/lib/validationFile/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";

@ApiUseTags("validationFile")
@Controller("validationFile")
@ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
export class ValidationFileController {
  constructor(private readonly fileService: ValidationFileService) {}

  private readonly logger = new Logger(ValidationFileController.name);

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ValidationFileDto, isArray: true })
  findAll() {
    return this.fileService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ValidationFileDto })
  findById(@Param("id") id: number) {
    return this.fileService.findById(id);
  }

  @Get(":id/serve")
  @ApiCreatedResponse({ description: "Find entity by Id." })
  async serve(@Param("id") id: number, @Res() res: Response) {
    const file = await this.fileService.findById(id);
    const dir = `/data/groups/${file.validation.groupId}/uploads/validation/${file.validation.id}`;
    const path = `${dir}/${file.hash}.${file.extension}`;

    const buffer = await this.fileService.getFileBuffer(path);
    const stream = this.fileService.getReadableStream(buffer);

    res.set({
      "Content-Length": buffer.length,
    });

    stream.pipe(res);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ValidationFileDto })
  async create(@Body() params: CreateValidationFileDto) {
    return this.fileService.create(params);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file) {
    this.logger.log(file);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ValidationFileDto })
  async update(@Param("id") id: number, @Body() params: UpdateValidationFileDto) {
    return this.fileService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all files for the group.", type: ValidationFileDto, isArray: true })
  getAllFilesForGroup(@Param("groupId") groupId: number) {
    return this.fileService.getAllFilesForGroup(groupId);
  }

  @Get("groupUser/:groupUserId")
  @ApiCreatedResponse({ description: "Find all files for the group user.", type: ValidationFileDto, isArray: true })
  getAllFilesForGroupUser(@Param("groupUserId") groupUserId: number) {
    return this.fileService.getAllFilesForGroupUser(groupUserId);
  }
}
