import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { MemberService } from "../member/member.service";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { LotService } from "../lot/lot.service";
import { ValidationService } from "../validation/validation.service";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

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
  @ApiCreatedResponse({ description: "Create entity.", type: CloneDto })
  async create(@Request() req, @Body() params: CreateCloneDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.cloneService.create({ ...params, createdBy: member.id });
  }

  @Get("clones/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: CloneDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("clones/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: CloneDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateCloneDto) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.cloneService.update(id, params);
  }

  @Delete("clones/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.cloneService.deleteById(id);
  }

  @Get("groups/:groupId/clones")
  @ApiCreatedResponse({ description: "Find all clones belonging to the group.", type: CloneDto, isArray: true })
  async getGroupClones(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.cloneService.getGroupClones(groupId);
  }

  @Get("clones/:id/lots")
  @ApiCreatedResponse({ description: "Find all lots belonging to the clone.", type: LotDto })
  async findCloneLots(@Request() req, @Param("id") id: number) {
    const clone = await this.cloneService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, clone.groupId);
    return this.lotService.getCloneLots(id);
  }

  @Get("clones/:id/validations")
  @ApiCreatedResponse({ description: "Find all validations belonging to the clone.", type: ValidationDto })
  async findCloneValidations(@Request() req, @Param("id") id: number) {
    const clone = await this.cloneService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, clone.groupId);
    return this.validationService.getCloneValidations(id);
  }
}
