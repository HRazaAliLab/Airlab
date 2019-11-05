import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PlateService } from "./plate.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePlateDto, PlateDto, UpdatePlateDto } from "@airlab/shared/lib/plate/dto";

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
  @ApiCreatedResponse({ description: "Find all plates for the group.", type: PlateDto, isArray: true })
  getAllPlatesForGroup(@Param("groupId") groupId: number) {
    return this.plateService.getAllPlatesForGroup(groupId);
  }

  @Get("groupUser/:groupUserId")
  @ApiCreatedResponse({ description: "Find all plates for the group user.", type: PlateDto, isArray: true })
  getAllPlatesForGroupUser(@Param("groupUserId") groupUserId: number) {
    return this.plateService.getAllPlatesForGroupUser(groupUserId);
  }
}
