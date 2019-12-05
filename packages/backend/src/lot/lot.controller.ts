import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { LotService } from "./lot.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("lots")
@ApiBearerAuth()
export class LotController {
  constructor(private readonly lotService: LotService, private readonly groupUserService: GroupUserService) {}

  @Post("lots")
  @ApiCreatedResponse({ description: "Create entity.", type: LotDto })
  async create(@Request() req, @Body() params: CreateLotDto) {
    const groupUser = await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.lotService.create({ ...params, createdBy: groupUser.id, status: "requested" });
  }

  @Get("lots/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: LotDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("lots/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: LotDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateLotDto) {
    const item = await this.lotService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.lotService.update(id, params);
  }

  @Delete("lots/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.lotService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.lotService.deleteById(id);
  }

  @Get("groups/:groupId/lots")
  @ApiCreatedResponse({
    description: "Find all lots for the group.",
    type: LotDto,
    isArray: true,
  })
  async getGroupLots(@Request() req, @Param("groupId") groupId: number) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return this.lotService.getGroupLots(groupId);
  }
}
