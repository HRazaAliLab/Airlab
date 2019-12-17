import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateTagDto, TagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";
import { MemberService } from "../member/member.service";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { ConjugateService } from "../conjugate/conjugate.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("tags")
@ApiBearerAuth()
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly memberService: MemberService,
    private readonly conjugateService: ConjugateService
  ) {}

  @Post("tags")
  @ApiCreatedResponse({ description: "Create entity.", type: TagDto })
  async create(@Request() req, @Body() params: CreateTagDto) {
    await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.tagService.create({ ...params });
  }

  @Get("tags/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: TagDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.tagService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("tags/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: TagDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateTagDto) {
    const item = await this.tagService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.tagService.update(id, params);
  }

  @Delete("tags/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.tagService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.tagService.deleteById(id);
  }

  @Get("groups/:groupId/tags")
  @ApiCreatedResponse({ description: "Find all tags for the group.", type: TagDto, isArray: true })
  async getGroupTags(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.tagService.getGroupTags(groupId);
  }

  @Get("tags/:id/conjugates")
  @ApiCreatedResponse({
    description: "Find all conjugates belonging to the tag.",
    type: ConjugateDto,
    isArray: true,
  })
  async getTagConjugates(@Request() req, @Param("id") id: number) {
    const tag = await this.tagService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, tag.groupId);
    return this.conjugateService.getTagConjugates(id);
  }
}
