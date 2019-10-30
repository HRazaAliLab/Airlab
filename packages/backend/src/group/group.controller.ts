import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GroupService } from "./group.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateGroupDto, GroupDto, InviteDto, RequestJoinGroupDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";

@ApiUseTags("group")
@Controller("group")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: GroupDto, isArray: true })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: GroupDto })
  findById(@Param("id") id: number) {
    return this.groupService.findById(id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: GroupDto })
  async update(@Param("id") id: number, @Body() params: UpdateGroupDto) {
    return this.groupService.update(id, params);
  }

  @Post()
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ description: "Create entity.", type: GroupDto })
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }

  @Post("join")
  @ApiCreatedResponse({ description: "Send request to join the group.", type: Boolean })
  async requestJoinGroup(@Body() params: RequestJoinGroupDto) {
    return this.groupService.requestJoinGroup(params.userId, params.groupId);
  }

  @Post("invite")
  @ApiCreatedResponse({ description: "Invite user to join the group.", type: Boolean })
  async invite(@Body() params: InviteDto) {
    return this.groupService.invite(params);
  }
}
