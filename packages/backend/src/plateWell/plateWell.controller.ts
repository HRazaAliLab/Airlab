import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PlateWellService } from "./plateWell.service";
import { PlateWellDto, CreatePlateWellDto, UpdatePlateWellDto } from "./plateWell.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("plateWell")
@Controller("plateWell")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PlateWellController {
  constructor(private readonly plateWellService: PlateWellService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: PlateWellDto, isArray: true })
  findAll() {
    return this.plateWellService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PlateWellDto })
  findById(@Param("id") id: number) {
    return this.plateWellService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: PlateWellDto })
  async create(@Body() params: CreatePlateWellDto) {
    return this.plateWellService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PlateWellDto })
  async update(@Param("id") id: number, @Body() params: UpdatePlateWellDto) {
    return this.plateWellService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all plate wells for the group.", type: PlateWellDto })
  getAllPlateWellsForGroup(@Param("groupId") groupId: number) {
    return this.plateWellService.getAllPlateWellsForGroup(groupId);
  }

  @Get("userGroup/:userGroupId")
  @ApiCreatedResponse({ description: "Find all plate wells for the userGroup.", type: PlateWellDto })
  getAllPlateWellsForUserGroup(@Param("userGroupId") userGroupId: number) {
    return this.plateWellService.getAllPlateWellsForUserGroup(userGroupId);
  }
}
