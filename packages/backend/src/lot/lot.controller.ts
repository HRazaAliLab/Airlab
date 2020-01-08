import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { LotService } from "./lot.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { MemberService } from "../member/member.service";
import { ConjugateService } from "../conjugate/conjugate.service";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

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
  @ApiCreatedResponse({ description: "Create entity.", type: LotDto })
  async create(@Request() req, @Body() params: CreateLotDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.lotService.create({ ...params, createdBy: member.id, status: "requested" });
  }

  @Get("lots/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: LotDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("lots/:id")
  @ApiOkResponse({ description: "Updated entity.", type: LotDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateLotDto) {
    const item = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.lotService.update(id, params);
  }

  @Delete("lots/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.lotService.deleteById(id);
  }

  @Get("groups/:groupId/lots")
  @ApiOkResponse({
    description: "Find all lots for the group.",
    type: LotDto,
    isArray: true,
  })
  async getGroupLots(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.lotService.getGroupLots(groupId);
  }

  @Get("lots/:id/conjugates")
  @ApiOkResponse({
    description: "Find all conjugates belonging to the lot.",
    type: ConjugateDto,
    isArray: true,
  })
  async getLotConjugates(@Request() req, @Param("id") id: number) {
    const lot = await this.lotService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, lot.groupId);
    return this.conjugateService.getLotConjugates(id);
  }
}
