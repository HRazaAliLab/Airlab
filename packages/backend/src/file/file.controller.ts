import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { FileService } from "./file.service";
import { CreateFileDto, FileDto, UpdateFileDto } from "./file.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

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

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: FileDto })
  async update(@Param("id") id: number, @Body() params: UpdateFileDto) {
    return this.fileService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all files for the group.", type: FileDto })
  getAllFilesForGroup(@Param("groupId") groupId: number) {
    return this.fileService.getAllFilesForGroup(groupId);
  }

  @Get("userGroup/:userGroupId")
  @ApiCreatedResponse({ description: "Find all files for the userGroup.", type: FileDto })
  getAllFilesForUserGroup(@Param("userGroupId") userGroupId: number) {
    return this.fileService.getAllFilesForUserGroup(userGroupId);
  }
}
