import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CloneService } from "./clone.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { MemberService } from "../member/member.service";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { LotService } from "../lot/lot.service";
import { ValidationService } from "../validation/validation.service";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("clones")
@ApiBearerAuth()
export class CloneController {
  constructor(
    private readonly cloneService: CloneService,
    private readonly memberService: MemberService,
    private readonly lotService: LotService,
    private readonly validationService: ValidationService
  ) {}

  @Post("clones")
  @ApiOperation({ summary: "Create new clone." })
  @ApiCreatedResponse({ type: CloneDto })
  async create(@Request() req, @Body() params: CreateCloneDto) {
    const member = await this.memberService.checkStandardMemberPermissions(req.user.userId, params.groupId);
    return this.cloneService.create({ ...params, createdBy: member.id });
  }

  @Get("clones/:id")
  @ApiOperation({ summary: "Find clone by its id." })
  @ApiOkResponse({ type: CloneDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("clones/:id")
  @ApiOperation({ summary: "Update clone." })
  @ApiOkResponse({ type: CloneDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateCloneDto) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkStandardMemberPermissions(req.user.userId, item.groupId);
    return this.cloneService.update(id, params);
  }

  @Patch("clones/:id/archive")
  @ApiOperation({ summary: "Set archive state for the clone." })
  @ApiOkResponse({ type: CloneDto })
  async updateArchiveState(@Request() req, @Param("id") id: number, @Body() params: UpdateStateDto) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkAdminMemberPermissions(req.user.userId, item.groupId);
    return this.cloneService.updateArchiveState(id, params);
  }

  @Delete("clones/:id")
  @ApiOperation({ summary: "Delete clone by its id." })
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkAdminMemberPermissions(req.user.userId, item.groupId);
    return this.cloneService.deleteById(id);
  }

  @Get("groups/:groupId/clones")
  @ApiOperation({ summary: "Find all clones belonging to the group." })
  @ApiOkResponse({ type: CloneDto, isArray: true })
  async getGroupClones(@Request() req, @Param("groupId") groupId: number, @Query() query) {
    await this.memberService.checkGuestMemberPermissions(req.user.userId, groupId);
    if (query.filter && query.filter === "archived") {
      return this.cloneService.getGroupArchivedClones(groupId);
    } else {
      return this.cloneService.getGroupClones(groupId);
    }
  }

  @Get("clones/:id/lots")
  @ApiOperation({ summary: "Find all lots belonging to the clone." })
  @ApiOkResponse({ type: LotDto, isArray: true })
  async findCloneLots(@Request() req, @Param("id") id: number) {
    const clone = await this.cloneService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, clone.groupId);
    return this.lotService.getCloneLots(id);
  }

  @Get("clones/:id/validations")
  @ApiOperation({ summary: "Find all validations belonging to the clone." })
  @ApiOkResponse({ type: ValidationDto, isArray: true })
  async findCloneValidations(@Request() req, @Param("id") id: number) {
    const clone = await this.cloneService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, clone.groupId);
    return this.validationService.getCloneValidations(id);
  }
}
