import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { MemberService } from "./member.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateMemberDto, MemberDto, UpdateMemberDto } from "@airlab/shared/lib/member/dto";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("members")
@ApiBearerAuth()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post("members")
  @ApiCreatedResponse({ description: "Create entity.", type: MemberDto })
  async create(@Request() req, @Body() params: CreateMemberDto) {
    await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    const existingMember = await this.memberService.findByUserIdAndGroupId(params.userId, params.groupId);
    if (existingMember) {
      throw new HttpException("User is already a member of the group", 409);
    }
    return this.memberService.create({ ...params });
  }

  @Get("members/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: MemberDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.memberService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("members/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: MemberDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateMemberDto) {
    const item = await this.memberService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.memberService.update(id, params);
  }

  @Delete("members/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.memberService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.memberService.deleteById(id);
  }

  @Get("groups/:groupId/members")
  @ApiCreatedResponse({ description: "Find all members of the group.", type: MemberDto, isArray: true })
  async getGroupMembers(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.memberService.getGroupMembers(groupId);
  }
}
