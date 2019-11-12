import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@ApiUseTags("clone")
@Controller("clone")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class CloneController {
  constructor(private readonly cloneService: CloneService, private readonly groupUserService: GroupUserService) {}

  @Get("getAllClonesForGroup")
  @ApiCreatedResponse({ description: "Find all clones for the user.", type: CloneDto, isArray: true })
  getAllClonesForGroup(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.cloneService.getAllClonesForGroupsWithProteinName(user.userId);
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: CloneDto })
  findById(@Param("id") id: number) {
    return this.cloneService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: CloneDto })
  async create(@Request() req, @Body() params: CreateCloneDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.cloneService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: CloneDto })
  async update(@Param("id") id: number, @Body() params: UpdateCloneDto) {
    return this.cloneService.update(id, params);
  }

  @Delete(":id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  deleteById(@Param("id") id: number) {
    return this.cloneService.deleteById(id);
  }
}
