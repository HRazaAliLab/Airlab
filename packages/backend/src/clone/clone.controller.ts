import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("clones")
@ApiBearerAuth()
export class CloneController {
  constructor(private readonly cloneService: CloneService, private readonly groupUserService: GroupUserService) {}

  @Post("clones")
  @ApiCreatedResponse({ description: "Create entity.", type: CloneDto })
  async create(@Request() req, @Body() params: CreateCloneDto) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.cloneService.create({ ...params, createdBy: groupUser.id });
  }

  @Get("clones/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: CloneDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("clones/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: CloneDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateCloneDto) {
    const item = await this.cloneService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.cloneService.update(id, params);
  }

  @Delete("clones/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.cloneService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.cloneService.deleteById(id);
  }

  @Get("groups/:groupId/clones")
  @ApiCreatedResponse({ description: "Find all clones belonging to the group.", type: CloneDto, isArray: true })
  async getGroupClones(@Request() req, @Param("groupId") groupId: number) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return this.cloneService.getGroupClones(groupId);
  }
}
