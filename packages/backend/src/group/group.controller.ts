import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GroupService } from "./group.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateGroupDto, GroupDto, InviteDto, RequestJoinGroupDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
import { UserDto } from "@airlab/shared/lib/user/dto";

@Controller()
@ApiUseTags("groups")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get("groups")
  @ApiCreatedResponse({ description: "Find all entities.", type: GroupDto, isArray: true })
  findAll() {
    return this.groupService.findAll();
  }

  @Get("groups/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: GroupDto })
  findById(@Param("id") id: number) {
    return this.groupService.findById(id);
  }

  @Patch("groups/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: GroupDto })
  async update(@Param("id") id: number, @Body() params: UpdateGroupDto) {
    return this.groupService.update(id, params);
  }

  @Post("groups")
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ description: "Create entity.", type: GroupDto })
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }

  @Post("groups/join")
  @ApiCreatedResponse({ description: "Send request to join the group.", type: Boolean })
  async requestJoinGroup(@Body() params: RequestJoinGroupDto) {
    return this.groupService.requestJoinGroup(params.userId, params.groupId);
  }

  @Post("groups/invite")
  @ApiCreatedResponse({ description: "Invite user to join the group.", type: Boolean })
  async invite(@Body() params: InviteDto) {
    return this.groupService.invite(params);
  }

  @Get("groups/:id/users")
  @ApiCreatedResponse({ description: "Find users in the group.", type: UserDto, isArray: true })
  getUsersInGroup(@Param("id") id: number) {
    return this.groupService.getUsersInGroup(id);
  }
}
