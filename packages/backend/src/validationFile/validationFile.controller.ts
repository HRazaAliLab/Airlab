import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Res } from "@nestjs/common";
import { ValidationFileService } from "./validationFile.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateValidationFileDto,
  ValidationFileDto,
  UpdateValidationFileDto,
} from "@airlab/shared/lib/validationFile/dto";
import { Response } from "express";

@ApiTags("validationFiles")
@Controller("validationFiles")
@ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
export class ValidationFileController {
  constructor(private readonly fileService: ValidationFileService) {}

  private readonly logger = new Logger(ValidationFileController.name);

  @Get()
  @ApiOkResponse({ description: "Find all entities.", type: ValidationFileDto, isArray: true })
  findAll() {
    return this.fileService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Find entity by Id.", type: ValidationFileDto })
  findById(@Param("id") id: number) {
    return this.fileService.findById(id);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  deleteById(@Param("id") id: number) {
    return this.fileService.deleteById(id);
  }

  @Get(":id/serve")
  @ApiOkResponse({ description: "Find entity by Id." })
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

  @Patch(":id")
  @ApiOkResponse({ description: "Updated entity.", type: ValidationFileDto })
  async update(@Param("id") id: number, @Body() params: UpdateValidationFileDto) {
    return this.fileService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiOkResponse({ description: "Find all files for the group.", type: ValidationFileDto, isArray: true })
  getAllFilesForGroup(@Param("groupId") groupId: number) {
    return this.fileService.getAllFilesForGroup(groupId);
  }

  @Get("memberId/:memberId")
  @ApiOkResponse({ description: "Find all files for the group member.", type: ValidationFileDto, isArray: true })
  getAllFilesForMember(@Param("memberId") memberId: number) {
    return this.fileService.getAllFilesForMember(memberId);
  }
}
