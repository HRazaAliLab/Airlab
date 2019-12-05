import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@ApiUseTags("reagents")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ReagentController {
  constructor(private readonly reagentService: ReagentService, private readonly groupUserService: GroupUserService) {}

  @Post("reagents")
  @ApiCreatedResponse({ description: "Create entity.", type: ReagentDto })
  async create(@Request() req, @Body() params: CreateReagentDto) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.reagentService.create({ ...params, createdBy: groupUser.id });
  }

  @Get("reagents/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ReagentDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.reagentService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("reagents/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ReagentDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateReagentDto) {
    const item = await this.reagentService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.reagentService.update(id, params);
  }

  @Delete("reagents/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.reagentService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.reagentService.deleteById(id);
  }

  @Get("groups/:groupId/reagents")
  @ApiCreatedResponse({
    description: "Find all reagents for the group.",
    type: ReagentDto,
    isArray: true,
  })
  async getGroupReagents(@Request() req, @Param("groupId") groupId: number) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return this.reagentService.getGroupReagents(groupId);
  }
}
