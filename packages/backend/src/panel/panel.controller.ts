import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@ApiUseTags("panel")
@Controller("panel")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PanelController {
  constructor(private readonly panelService: PanelService, private readonly groupUserService: GroupUserService) {}

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
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Param("id") id: number, @Body() params: UpdatePanelDto) {
    return this.panelService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all panels for the group.", type: PanelDto, isArray: true })
  async getAllPanelsForGroup(@Request() req, @Param("groupId") groupId: number) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, groupId);
    return groupUser.canPanels
      ? this.panelService.getAllPanelsForGroup(groupId)
      : this.panelService.getAllPanelsForGroupUser(groupUser.id);
  }
}
