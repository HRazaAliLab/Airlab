import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePanelDto, DuplicatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@ApiUseTags("panels")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PanelController {
  constructor(private readonly panelService: PanelService, private readonly groupUserService: GroupUserService) {}

  @Get("panels")
  @ApiCreatedResponse({ description: "Find all entities.", type: PanelDto, isArray: true })
  findAll() {
    return this.panelService.findAll();
  }

  @Get("panels/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PanelDto })
  findById(@Param("id") id: number) {
    return this.panelService.findById(id);
  }

  @Post("panels")
  @ApiCreatedResponse({ description: "Create entity.", type: PanelDto })
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch("panels/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Param("id") id: number, @Body() params: UpdatePanelDto) {
    return this.panelService.update(id, params);
  }

  @Put("panels/:id")
  @ApiCreatedResponse({ description: "Duplicate entity.", type: PanelDto })
  async duplicate(@Request() req, @Param("id") id: number, @Body() params: DuplicatePanelDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.panelService.duplicate(id, { ...params, createdBy: groupUser.id });
  }

  @Delete("panels/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  deleteById(@Param("id") id: number) {
    return this.panelService.deleteById(id);
  }

  @Get("group/:groupId/panels")
  @ApiCreatedResponse({ description: "Find all panels for the group.", type: PanelDto, isArray: true })
  async getAllPanelsForGroup(@Request() req, @Param("groupId") groupId: number) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, groupId);
    return groupUser.canPanels
      ? this.panelService.getAllPanelsForGroup(groupId)
      : this.panelService.getAllPanelsForGroupUser(groupUser.id);
  }
}
