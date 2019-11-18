import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateFileDto, FileDto, UpdateFileDto } from "@airlab/shared/lib/file/dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiUseTags("file")
@Controller("file")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: FileDto, isArray: true })
  findAll() {
    return this.fileService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: FileDto })
  findById(@Param("id") id: number) {
    return this.fileService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: FileDto })
  async create(@Body() params: CreateFileDto) {
    return this.fileService.create(params);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: FileDto })
  async update(@Param("id") id: number, @Body() params: UpdateFileDto) {
    return this.fileService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all files for the group.", type: FileDto, isArray: true })
  getAllFilesForGroup(@Param("groupId") groupId: number) {
    return this.fileService.getAllFilesForGroup(groupId);
  }

  @Get("groupUser/:groupUserId")
  @ApiCreatedResponse({ description: "Find all files for the group user.", type: FileDto, isArray: true })
  getAllFilesForGroupUser(@Param("groupUserId") groupUserId: number) {
    return this.fileService.getAllFilesForGroupUser(groupUserId);
  }
}
