import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PlateService } from "./plate.service";
import { PlateDto, CreatePlateDto, UpdatePlateDto } from "./plate.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("plate")
@Controller("plate")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PlateController {
  constructor(private readonly plateService: PlateService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: PlateDto, isArray: true })
  findAll() {
    return this.plateService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PlateDto })
  findById(@Param("id") id: number) {
    return this.plateService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: PlateDto })
  async create(@Body() params: CreatePlateDto) {
    return this.plateService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PlateDto })
  async update(@Param("id") id: number, @Body() params: UpdatePlateDto) {
    return this.plateService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all plates for the group.", type: PlateDto })
  getAllPlatesForGroup(@Param("groupId") groupId: number) {
    return this.plateService.getAllPlatesForGroup(groupId);
  }

  @Get("userGroup/:userGroupId")
  @ApiCreatedResponse({ description: "Find all plates for the userGroup.", type: PlateDto })
  getAllPlatesForUserGroup(@Param("userGroupId") userGroupId: number) {
    return this.plateService.getAllPlatesForUserGroup(userGroupId);
  }
}
