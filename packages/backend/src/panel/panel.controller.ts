import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { PanelService } from "./panel.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
import { UpdateArchiveStateDto } from "@airlab/shared/lib/core/dto";

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
  @ApiOperation({ summary: "Create entity." })
  @ApiCreatedResponse({ type: PanelDto })
  async create(@Request() req, @Body() params: CreatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.create({ ...params, createdBy: member.id });
  }

  @Get("panels/:id")
  @ApiOperation({ summary: "Find entity by Id." })
  @ApiOkResponse({ type: PanelDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("panels/:id")
  @ApiOperation({ summary: "Updated entity." })
  @ApiOkResponse({ type: PanelDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdatePanelDto) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelService.update(id, params);
  }

  @Patch("panels/:id/archive")
  @ApiOperation({ summary: "Set archive state for the entity." })
  @ApiOkResponse({ type: PanelDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateArchiveStateDto) {
    const item = await this.panelService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.panelService.updateArchiveState(id, params);
  }

  @Put("panels/:id")
  @ApiOperation({ summary: "Duplicate entity." })
  @ApiOkResponse({ type: PanelDto })
  async duplicate(@Request() req, @Param("id") id: number, @Body() params: DuplicatePanelDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.panelService.duplicate(id, { ...params, createdBy: member.id });
  }

  @Delete("panels/:id")
  @ApiOperation({ summary: "Delete entity by Id." })
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.panelService.deleteById(id);
  }

  @Get("panels/:id/elements")
  @ApiOperation({ summary: "Find all panel conjugate elements." })
  @ApiOkResponse({ type: PanelElementDataDto, isArray: true })
  async findPanelElements(@Request() req, @Param("id") id: number) {
    const item = await this.panelService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.panelElementService.findPanelElements(id);
  }

  @Get("groups/:groupId/panels")
  @ApiOperation({ summary: "Find all panels for the group." })
  @ApiOkResponse({ type: PanelDto, isArray: true })
  async getGroupPanels(@Request() req, @Param("groupId") groupId: number) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return member.allPanels
      ? this.panelService.getGroupPanels(groupId)
      : this.panelService.getPersonalGroupPanels(groupId, member.id);
  }

  @Get("conjugate/:conjugateId/panels")
  @ApiOperation({ summary: "Find all panels for the conjugate." })
  @ApiOkResponse({ type: PanelDto, isArray: true })
  async getConjugatePanels(@Request() req, @Param("conjugateId") conjugateId: number) {
    const conjugate = await this.conjugateService.findById(conjugateId);
    await this.memberService.checkMemberPermissions(req.user.userId, conjugate.groupId);
    return this.panelService.getConjugatePanels(conjugateId);
  }
}
