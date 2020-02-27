import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {
  CreatePanelDto,
  DuplicatePanelDto,
  PanelDto,
  PanelElementDataDto,
  UpdatePanelDto,
} from "@airlab/shared/lib/panel/dto";
import { MemberService } from "../member/member.service";
import { PanelElementService } from "../panelElement/panelElement.service";
import { ConjugateService } from "../conjugate/conjugate.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("panels")
@ApiBearerAuth()
export class PanelController {
  constructor(
    private readonly panelService: PanelService,
    private readonly panelElementService: PanelElementService,
    private readonly memberService: MemberService,
    private readonly conjugateService: ConjugateService
  ) {}

  @Post("panels")
  @ApiCreatedResponse({ description: "Create entity.", type: PanelDto })
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: member.id });
  }

  @Get("panels/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: PanelDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("panels/:id")
  @ApiOkResponse({ description: "Updated entity.", type: PanelDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdatePanelDto) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelService.update(id, params);
  }

  @Put("panels/:id")
  @ApiOkResponse({ description: "Duplicate entity.", type: PanelDto })
  async duplicate(@Request() req, @Param("id") id: number, @Body() params: DuplicatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.duplicate(id, { ...params, createdBy: member.id });
  }

  @Delete("panels/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelService.deleteById(id);
  }

  @Get("panels/:id/elements")
  @ApiOkResponse({ description: "Find all panel conjugate elements.", type: PanelElementDataDto, isArray: true })
  async findPanelElements(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelElementService.findPanelElements(id);
  }

  @Get("groups/:groupId/panels")
  @ApiOkResponse({ description: "Find all panels for the group.", type: PanelDto, isArray: true })
  async getGroupPanels(@Request() req, @Param("groupId") groupId: number) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return member.allPanels
      ? this.panelService.getGroupPanels(groupId)
      : this.panelService.getPersonalGroupPanels(groupId, member.id);
  }

  @Get("conjugate/:conjugateId/panels")
  @ApiOkResponse({ description: "Find all panels for the conjugate.", type: PanelDto, isArray: true })
  async getConjugatePanels(@Request() req, @Param("conjugateId") conjugateId: number) {
    const conjugate = await this.conjugateService.findById(conjugateId);
    await this.memberService.checkMemberPermissions(req.user.userId, conjugate.groupId);
    return this.panelService.getConjugatePanels(conjugateId);
  }
}
