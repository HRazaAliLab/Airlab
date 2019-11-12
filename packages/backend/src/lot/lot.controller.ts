import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { LotService } from "./lot.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@ApiUseTags("lot")
@Controller("lot")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class LotController {
  constructor(private readonly lotService: LotService, private readonly groupUserService: GroupUserService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: LotDto, isArray: true })
  findAll() {
    return this.lotService.findAll();
  }

  @Get("getAllLotsForGroup")
  @ApiCreatedResponse({
    description: "Find all lots for the group.",
    type: LotDto,
    isArray: true,
  })
  getAllLotsForGroup(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.lotService.getAllLotsForGroup(user.userId);
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: LotDto })
  findById(@Param("id") id: number) {
    return this.lotService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: LotDto })
  async create(@Request() req, @Body() params: CreateLotDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.lotService.create({ ...params, createdBy: groupUser.id, status: "requested" });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: LotDto })
  async update(@Param("id") id: number, @Body() params: UpdateLotDto) {
    return this.lotService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({
    description: "Find all lots for the group.",
    type: LotDto,
    isArray: true,
  })
  getAllReagentInstancesForGroup(@Param("groupId") groupId: number) {
    return this.lotService.getAllReagentInstancesForGroup(groupId);
  }

  @Get("group/:groupId/lots")
  @ApiCreatedResponse({
    description: "Find all lots with lots for the group.",
    type: LotDto,
    isArray: true,
  })
  getAllReagentInstancesWithLotsForGroup(@Param("groupId") groupId: number) {
    return this.lotService.getAllReagentInstancesWithLotsForGroup(groupId);
  }
}
