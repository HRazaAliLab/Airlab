import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";
import { MemberService } from "../member/member.service";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import { ReagentService } from "../reagent/reagent.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("providers")
@ApiBearerAuth()
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly memberService: MemberService,
    private readonly reagentService: ReagentService
  ) {}

  @Post("providers")
  @ApiCreatedResponse({ description: "Create entity.", type: ProviderDto })
  async create(@Request() req, @Body() params: CreateProviderDto) {
    await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.providerService.create({ ...params });
  }

  @Get("providers/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: ProviderDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.providerService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("providers/:id")
  @ApiOkResponse({ description: "Updated entity.", type: ProviderDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateProviderDto) {
    const item = await this.providerService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.providerService.update(id, params);
  }

  @Delete("providers/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.providerService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.providerService.deleteById(id);
  }

  @Get("groups/:groupId/providers")
  @ApiOkResponse({ description: "Find all providers for the group.", type: ProviderDto, isArray: true })
  async getGroupSpecies(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.providerService.getGroupProviders(groupId);
  }

  @Get("providers/:id/reagents")
  @ApiOkResponse({
    description: "Find all reagents belonging to the provider.",
    type: ReagentDto,
    isArray: true,
  })
  async getProviderReagents(@Request() req, @Param("id") id: number) {
    const provider = await this.providerService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, provider.groupId);
    return this.reagentService.getProviderReagents(id);
  }
}
