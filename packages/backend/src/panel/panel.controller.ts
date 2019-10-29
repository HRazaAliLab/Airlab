import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { CreatePanelDto, PanelDto, UpdatePanelDto } from "./panel.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("panel")
@Controller("panel")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: PanelDto, isArray: true })
  findAll() {
    return this.panelService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PanelDto })
  findById(@Param("id") id: number) {
    return this.panelService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: PanelDto })
  async create(@Body() params: CreatePanelDto) {
    return this.panelService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Param("id") id: number, @Body() params: UpdatePanelDto) {
    return this.panelService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all panels for the group.", type: PanelDto })
  getAllPanelsForGroup(@Param("groupId") groupId: number) {
    return this.panelService.getAllPanelsForGroup(groupId);
  }

  @Get("user/:userId")
  @ApiCreatedResponse({ description: "Find all panels for the user.", type: PanelDto })
  getAllPanelsForUser(@Param("userId") userId: number) {
    return this.panelService.getAllPanelsForUser(userId);
  }
}
