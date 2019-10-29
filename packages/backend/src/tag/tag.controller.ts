import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto, TagDto, UpdateTagDto } from "./tag.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

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
