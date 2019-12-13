import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { MemberService } from "../member/member.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("conjugates")
@ApiBearerAuth()
export class ConjugateController {
  constructor(private readonly conjugateService: ConjugateService, private readonly memberService: MemberService) {}

  @Post("conjugates")
  @ApiCreatedResponse({ description: "Create entity.", type: ConjugateDto })
  async create(@Request() req, @Body() params: CreateConjugateDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.conjugateService.create({ ...params, createdBy: member.id });
  }

  @Get("conjugates/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ConjugateDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("conjugates/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ConjugateDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateConjugateDto) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.update(id, params);
  }

  @Delete("conjugates/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.conjugateService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.conjugateService.deleteById(id);
  }

  @Get("groups/:groupId/conjugates")
  @ApiCreatedResponse({ description: "Find all conjugates belonging to the group.", type: ConjugateDto, isArray: true })
  async getGroupConjugates(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.conjugateService.getGroupConjugates(groupId);
  }
}
