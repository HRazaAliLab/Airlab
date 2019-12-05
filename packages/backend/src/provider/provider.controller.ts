import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("providers")
@ApiBearerAuth()
export class ProviderController {
  constructor(private readonly providerService: ProviderService, private readonly groupUserService: GroupUserService) {}

  @Post("providers")
  @ApiCreatedResponse({ description: "Create entity.", type: ProviderDto })
  async create(@Request() req, @Body() params: CreateProviderDto) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.providerService.create({ ...params });
  }

  @Get("providers/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ProviderDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.providerService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("providers/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ProviderDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateProviderDto) {
    const item = await this.providerService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.providerService.update(id, params);
  }

  @Delete("providers/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.providerService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.providerService.deleteById(id);
  }

  @Get("groups/:groupId/providers")
  @ApiCreatedResponse({ description: "Find all providers for the group.", type: ProviderDto, isArray: true })
  async getGroupSpecies(@Request() req, @Param("groupId") groupId: number) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return this.providerService.getGroupProviders(groupId);
  }
}
