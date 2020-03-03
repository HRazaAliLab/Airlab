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
import { ConjugateService } from "./conjugate.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { MemberService } from "../member/member.service";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("conjugates")
@ApiBearerAuth()
export class ConjugateController {
  constructor(private readonly conjugateService: ConjugateService, private readonly memberService: MemberService) {}

  @Post("conjugates")
  @ApiOperation({ summary: "Create new conjugate." })
  @ApiCreatedResponse({ type: ConjugateDto })
  async create(@Request() req, @Body() params: CreateConjugateDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.conjugateService.create({ ...params, createdBy: member.id });
  }

  @Get("conjugates/:id")
  @ApiOperation({ summary: "Find conjugate by its id." })
  @ApiOkResponse({ type: ConjugateDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("conjugates/:id")
  @ApiOperation({ summary: "Updated conjugate." })
  @ApiOkResponse({ type: ConjugateDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateConjugateDto) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.update(id, params);
  }

  @Patch("conjugates/:id/archive")
  @ApiOperation({ summary: "Set archive state for the conjugate." })
  @ApiOkResponse({ type: ConjugateDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateStateDto) {
    const item = await this.conjugateService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.conjugateService.updateArchiveState(id, params);
  }

  @Delete("conjugates/:id")
  @ApiOperation({ summary: "Delete conjugate by its id." })
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    if (member.role < 100) {
      throw new UnauthorizedException("Only group admins can perform this operation");
    }
    return this.conjugateService.deleteById(id);
  }

  @Get("groups/:groupId/conjugates")
  @ApiOperation({ summary: "Find all conjugates belonging to the group." })
  @ApiOkResponse({ type: ConjugateDto, isArray: true })
  async getGroupConjugates(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.conjugateService.getGroupConjugates(groupId);
  }
}
