import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { LotService } from "./lot.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateLotDto, LotDto, UpdateLotDto, UpdateLotStatusDto } from "@airlab/shared/lib/lot/dto";
import { MemberService } from "../member/member.service";
import { ConjugateService } from "../conjugate/conjugate.service";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("lots")
@ApiBearerAuth()
export class LotController {
  constructor(
    private readonly lotService: LotService,
    private readonly memberService: MemberService,
    private readonly conjugateService: ConjugateService
  ) {}

  @Post("lots")
  @ApiOperation({ summary: "Create entity." })
  @ApiCreatedResponse({ type: LotDto })
  async create(@Request() req, @Body() params: CreateLotDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.lotService.create({ ...params, createdBy: member.id });
  }

  @Get("lots/:id")
  @ApiOperation({ summary: "Find entity by Id." })
  @ApiOkResponse({ type: LotDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("lots/:id")
  @ApiOperation({ summary: "Updated entity." })
  @ApiOkResponse({ type: LotDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateLotDto) {
    const item = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.lotService.update(id, params);
  }

  @Patch("lots/:id/archive")
  @ApiOperation({ summary: "Set archive state for the entity." })
  @ApiOkResponse({ type: LotDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateStateDto) {
    const item = await this.lotService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.lotService.updateArchiveState(id, params);
  }

  @Patch("lots/:id/status")
  @ApiOperation({ summary: "Change lot status." })
  @ApiOkResponse({ type: LotDto })
  async updateStatus(@Request() req, @Param("id") id: number, @Body() params: UpdateLotStatusDto) {
    const item = await this.lotService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.lotService.updateStatus(id, member.id, params);
  }

  @Delete("lots/:id")
  @ApiOperation({ summary: "Delete entity by Id." })
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.lotService.deleteById(id);
  }

  @Get("groups/:groupId/lots")
  @ApiOperation({ summary: "Find all lots for the group." })
  @ApiOkResponse({ type: LotDto, isArray: true })
  async getGroupLots(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.lotService.getGroupLots(groupId);
  }

  @Get("lots/:id/conjugates")
  @ApiOperation({ summary: "Find all conjugates belonging to the lot." })
  @ApiOkResponse({ type: ConjugateDto, isArray: true })
  async getLotConjugates(@Request() req, @Param("id") id: number) {
    const lot = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, lot.groupId);
    return this.conjugateService.getLotConjugates(id);
  }
}
