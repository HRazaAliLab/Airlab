import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePanelDto, DuplicatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("panels")
@ApiBearerAuth()
export class PanelController {
  constructor(private readonly panelService: PanelService, private readonly groupUserService: GroupUserService) {}

  @Post("panels")
  @ApiCreatedResponse({ description: "Create entity.", type: PanelDto })
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: groupUser.id });
  }

  @Get("panels/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PanelDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("panels/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdatePanelDto) {
    const item = await this.panelService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.panelService.update(id, params);
  }

  @Put("panels/:id")
  @ApiCreatedResponse({ description: "Duplicate entity.", type: PanelDto })
  async duplicate(@Request() req, @Param("id") id: number, @Body() params: DuplicatePanelDto) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.panelService.duplicate(id, { ...params, createdBy: groupUser.id });
  }

  @Delete("panels/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.panelService.deleteById(id);
  }

  @Get("groups/:groupId/panels")
  @ApiCreatedResponse({ description: "Find all panels for the group.", type: PanelDto, isArray: true })
  async getAllPanelsForGroup(@Request() req, @Param("groupId") groupId: number) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return groupUser.canPanels
      ? this.panelService.getGroupPanels(groupId)
      : this.panelService.getPersonalGroupPanels(groupId, groupUser.id);
  }
}
