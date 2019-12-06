import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePanelDto, DuplicatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { MemberService } from "../member/member.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("panels")
@ApiBearerAuth()
export class PanelController {
  constructor(private readonly panelService: PanelService, private readonly memberService: MemberService) {}

  @Post("panels")
  @ApiCreatedResponse({ description: "Create entity.", type: PanelDto })
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: member.id });
  }

  @Get("panels/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PanelDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("panels/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdatePanelDto) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelService.update(id, params);
  }

  @Put("panels/:id")
  @ApiCreatedResponse({ description: "Duplicate entity.", type: PanelDto })
  async duplicate(@Request() req, @Param("id") id: number, @Body() params: DuplicatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.duplicate(id, { ...params, createdBy: member.id });
  }

  @Delete("panels/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelService.deleteById(id);
  }

  @Get("groups/:groupId/panels")
  @ApiCreatedResponse({ description: "Find all panels for the group.", type: PanelDto, isArray: true })
  async getAllPanelsForGroup(@Request() req, @Param("groupId") groupId: number) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return member.canPanels
      ? this.panelService.getGroupPanels(groupId)
      : this.panelService.getPersonalGroupPanels(groupId, member.id);
  }
}
