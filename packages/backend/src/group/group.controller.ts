import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { GroupService } from "./group.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateGroupDto, GroupDto, InviteDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("groups")
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("groups")
  @ApiOperation({ summary: "Create new group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: GroupDto })
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }

  @Get("groups")
  @ApiOperation({ summary: "Get all groups." })
  @ApiOkResponse({ type: GroupDto, isArray: true })
  findAll() {
    return this.groupService.findAll();
  }

  @Get("groups/:id")
  @ApiOperation({ summary: "Get group by its id." })
  @ApiOkResponse({ type: GroupDto })
  findById(@Param("id") id: number) {
    return this.groupService.findById(id);
  }

  @Patch("groups/:id")
  @ApiOperation({ summary: "Update group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: GroupDto })
  async update(@Param("id") id: number, @Body() params: UpdateGroupDto) {
    return this.groupService.update(id, params);
  }

  @Delete("groups/:id")
  @ApiOperation({ summary: "Delete group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    return this.groupService.deleteById(id);
  }

  @Post("groups/:id/join")
  @ApiOperation({ summary: "Send request to join the group." })
  @ApiOkResponse({ type: Boolean })
  async joinGroup(@Request() req, @Param("id") id: number) {
    const user: JwtPayloadDto = req.user;
    return this.groupService.joinGroup(user.userId, id);
  }

  @Post("groups/invite")
  @ApiOperation({ summary: "Invite user to join the group." })
  @ApiOkResponse({ type: Boolean })
  async invite(@Body() params: InviteDto) {
    return this.groupService.invite(params);
  }
}
