import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { MemberService } from "./member.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
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
    if (!req.user.isAdmin) {
      const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
      if (member.role < 100) {
        throw new UnauthorizedException();
      }
    }
    const existingMember = await this.memberService.findByUserIdAndGroupId(params.userId, params.groupId);
    if (existingMember) {
      throw new HttpException("User is already a member of the group", 409);
    }
    return this.memberService.create({ ...params });
  }

  @Get("members/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: MemberDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.memberService.findById(id);
    if (!req.user.isAdmin) {
      await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    }
    return item;
  }

  @Patch("members/:id")
  @ApiOkResponse({ description: "Updated entity.", type: MemberDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateMemberDto) {
    const item = await this.memberService.findById(id);
    if (!req.user.isAdmin) {
      const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
      if (member.role < 100) {
        throw new UnauthorizedException("Only group admins can perform this operation");
      }
    }
    return this.memberService.update(id, params);
  }

  @Delete("members/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.memberService.findById(id);
    if (!req.user.isAdmin) {
      const member = await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
      if (member.role < 100) {
        throw new UnauthorizedException("Only group admins can perform this operation");
      }
    }
    return this.memberService.deleteById(id);
  }

  @Get("groups/:groupId/members")
  @ApiOkResponse({ description: "Find all members of the group.", type: MemberDto, isArray: true })
  async getGroupMembers(@Request() req, @Param("groupId") groupId: number) {
    if (!req.user.isAdmin) {
      await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    }
    return this.memberService.getGroupMembers(groupId);
  }

  @Get("groups/:groupId/members/me")
  @ApiOkResponse({ description: "Find personal member of the group.", type: MemberDto })
  async getMyMember(@Request() req, @Param("groupId") groupId: number) {
    return await this.memberService.checkMemberPermissions(req.user.userId, groupId);
  }
}
