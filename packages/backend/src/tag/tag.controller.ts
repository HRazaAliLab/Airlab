import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateTagDto, TagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";
import { DeleteResult } from "typeorm";

@ApiUseTags("tag")
@Controller("tag")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: TagDto, isArray: true })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: TagDto })
  findById(@Param("id") id: number) {
    return this.tagService.findById(id);
  }

  @Delete(":id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: DeleteResult })
  deleteById(@Param("id") id: number) {
    return this.tagService.deleteById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: TagDto })
  async create(@Body() params: CreateTagDto) {
    return this.tagService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: TagDto })
  async update(@Param("id") id: number, @Body() params: UpdateTagDto) {
    return this.tagService.update(id, params);
  }
}
