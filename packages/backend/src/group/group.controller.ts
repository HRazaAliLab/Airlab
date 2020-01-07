import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { GroupService } from "./group.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
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
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ description: "Create entity.", type: GroupDto })
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }

  @Get("groups")
  @ApiOkResponse({ description: "Find all entities.", type: GroupDto, isArray: true })
  findAll() {
    return this.groupService.findAll();
  }

  @Get("groups/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: GroupDto })
  findById(@Param("id") id: number) {
    return this.groupService.findById(id);
  }

  @Patch("groups/:id")
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ description: "Updated entity.", type: GroupDto })
  async update(@Param("id") id: number, @Body() params: UpdateGroupDto) {
    return this.groupService.update(id, params);
  }

  @Delete("groups/:id")
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    return this.groupService.deleteById(id);
  }

  @Post("groups/:id/join")
  @ApiOkResponse({ description: "Send request to join the group.", type: Boolean })
  async joinGroup(@Request() req, @Param("id") id: number) {
    const user: JwtPayloadDto = req.user;
    return this.groupService.joinGroup(user.userId, id);
  }

  @Post("groups/invite")
  @ApiOkResponse({ description: "Invite user to join the group.", type: Boolean })
  async invite(@Body() params: InviteDto) {
    return this.groupService.invite(params);
  }
}
