import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "./clone.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("clone")
@Controller("clone")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class CloneController {
  constructor(private readonly cloneService: CloneService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: CloneDto, isArray: true })
  findAll() {
    return this.cloneService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: CloneDto })
  findById(@Param("id") id: number) {
    return this.cloneService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: CloneDto })
  async create(@Body() params: CreateCloneDto) {
    return this.cloneService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: CloneDto })
  async update(@Param("id") id: number, @Body() params: UpdateCloneDto) {
    return this.cloneService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all clones for the group.", type: CloneDto, isArray: true })
  getAllClonesForGroup(@Param("groupId") groupId: number) {
    return this.cloneService.getAllClonesForGroup(groupId);
  }
}
