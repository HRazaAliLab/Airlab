import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";
import { MemberService } from "../member/member.service";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { LotService } from "../lot/lot.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("providers")
@ApiBearerAuth()
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly memberService: MemberService,
    private readonly lotService: LotService
  ) {}

  @Post("providers")
  @ApiCreatedResponse({ description: "Create entity.", type: ProviderDto })
  async create(@Request() req, @Body() params: CreateProviderDto) {
    await this.memberService.checkStandardMemberPermissions(req.user.userId, params.groupId);
    return this.providerService.create({ ...params });
  }

  @Get("providers/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: ProviderDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.providerService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("providers/:id")
  @ApiOkResponse({ description: "Updated entity.", type: ProviderDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateProviderDto) {
    const item = await this.providerService.findById(id);
    await this.memberService.checkStandardMemberPermissions(req.user.userId, item.groupId);
    return this.providerService.update(id, params);
  }

  // @Delete("providers/:id")
  // @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  // async deleteById(@Request() req, @Param("id") id: number) {
  //   const item = await this.providerService.findById(id);
  //   await this.memberService.checkAdminMemberPermissions(req.user.userId, item.groupId);
  //   return this.providerService.deleteById(id);
  // }

  @Get("groups/:groupId/providers")
  @ApiOkResponse({ description: "Find all providers for the group.", type: ProviderDto, isArray: true })
  async getGroupSpecies(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkGuestMemberPermissions(req.user.userId, groupId);
    return this.providerService.getGroupProviders(groupId);
  }

  @Get("providers/:id/lots")
  @ApiOkResponse({
    description: "Find all lots belonging to the provider.",
    type: LotDto,
    isArray: true,
  })
  async getProviderLots(@Request() req, @Param("id") id: number) {
    const provider = await this.providerService.findById(id);
    await this.memberService.checkGuestMemberPermissions(req.user.userId, provider.groupId);
    return this.lotService.getProviderLots(id);
  }
}
