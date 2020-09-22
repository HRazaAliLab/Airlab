import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {
  ConjugateDto,
  CreateConjugateDto,
  UpdateConjugateDto,
  UpdateConjugateStatusDto,
} from "@airlab/shared/lib/conjugate/dto";
import { MemberService } from "../member/member.service";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { ValidationService } from "../validation/validation.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("conjugates")
@ApiBearerAuth()
export class ConjugateController {
  constructor(
    private readonly conjugateService: ConjugateService,
    private readonly memberService: MemberService,
    private readonly validationService: ValidationService
  ) {}

  @Post("conjugates")
  @ApiOperation({ summary: "Create new conjugate." })
  @ApiCreatedResponse({ type: ConjugateDto })
  async create(@Request() req, @Body() params: CreateConjugateDto) {
    const member = await this.memberService.checkStandardMemberPermissions(req.user.userId, params.groupId);
    return this.conjugateService.create({ ...params, createdBy: member.id });
  }

  @Get("conjugates/:id")
  @ApiOperation({ summary: "Find conjugate by its id." })
  @ApiOkResponse({ type: ConjugateDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("conjugates/:id")
  @ApiOperation({ summary: "Updated conjugate." })
  @ApiOkResponse({ type: ConjugateDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateConjugateDto) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkStandardMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.update(id, params);
  }

  @Patch("conjugates/:id/archive")
  @ApiOperation({ summary: "Set archive state for the conjugate." })
  @ApiOkResponse({ type: ConjugateDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateStateDto) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkAdminMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.updateArchiveState(id, params);
  }

  @Patch("conjugates/:id/status")
  @ApiOperation({ summary: "Change conjugate status." })
  @ApiOkResponse({ type: ConjugateDto })
  async updateStatus(@Request() req, @Param("id") id: number, @Body() params: UpdateConjugateStatusDto) {
    const item = await this.conjugateService.findById(id);
    const member = await this.memberService.checkStandardMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.updateStatus(id, member.id, params);
  }

  @Delete("conjugates/:id")
  @ApiOperation({ summary: "Delete conjugate by its id." })
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkAdminMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.deleteById(id);
  }

  @Get("groups/:groupId/conjugates")
  @ApiOperation({ summary: "Find all conjugates belonging to the group." })
  @ApiOkResponse({ type: ConjugateDto, isArray: true })
  async getGroupConjugates(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkGuestMemberPermissions(req.user.userId, groupId);
    return this.conjugateService.getGroupConjugates(groupId);
  }

  @Get("conjugates/:id/validations")
  @ApiOperation({ summary: "Find all validations belonging to the conjugate." })
  @ApiOkResponse({ type: ValidationDto, isArray: true })
  async findConjugateValidations(@Request() req, @Param("id") id: number) {
    const conjugate = await this.conjugateService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, conjugate.groupId);
    return this.validationService.getConjugateValidations(id);
  }
}
