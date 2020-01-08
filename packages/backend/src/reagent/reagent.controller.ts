import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { MemberService } from "../member/member.service";

@Controller()
@ApiTags("reagents")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ReagentController {
  constructor(private readonly reagentService: ReagentService, private readonly memberService: MemberService) {}

  @Post("reagents")
  @ApiCreatedResponse({ description: "Create entity.", type: ReagentDto })
  async create(@Request() req, @Body() params: CreateReagentDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.reagentService.create({ ...params, createdBy: member.id });
  }

  @Get("reagents/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: ReagentDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.reagentService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("reagents/:id")
  @ApiOkResponse({ description: "Updated entity.", type: ReagentDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateReagentDto) {
    const item = await this.reagentService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.reagentService.update(id, params);
  }

  @Delete("reagents/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.reagentService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.reagentService.deleteById(id);
  }

  @Get("groups/:groupId/reagents")
  @ApiOkResponse({
    description: "Find all reagents for the group.",
    type: ReagentDto,
    isArray: true,
  })
  async getGroupReagents(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.reagentService.getGroupReagents(groupId);
  }
}
