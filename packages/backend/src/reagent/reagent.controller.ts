import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@ApiUseTags("reagent")
@Controller("reagent")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ReagentController {
  constructor(private readonly reagentService: ReagentService, private readonly groupUserService: GroupUserService) {}

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ReagentDto })
  findById(@Param("id") id: number) {
    return this.reagentService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ReagentDto })
  async create(@Request() req, @Body() params: CreateReagentDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.reagentService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ReagentDto })
  async update(@Param("id") id: number, @Body() params: UpdateReagentDto) {
    return this.reagentService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({
    description: "Find all reagents for the group.",
    type: ReagentDto,
    isArray: true,
  })
  getAllReagentsForGroup(@Param("groupId") groupId: number) {
    return this.reagentService.getAllReagentsForGroup(groupId);
  }
}
