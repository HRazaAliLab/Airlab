import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { LotService } from "./lot.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

@ApiUseTags("lot")
@Controller("lot")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: LotDto, isArray: true })
  findAll() {
    return this.lotService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: LotDto })
  findById(@Param("id") id: number) {
    return this.lotService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: LotDto })
  async create(@Body() params: CreateLotDto) {
    return this.lotService.create(params);
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

  @Get("user/:userId/lots")
  @ApiCreatedResponse({
    description: "Find all lots for the user.",
    type: LotDto,
    isArray: true,
  })
  getAllLotsForGroup(@Param("userId") userId: number) {
    return this.lotService.getAllLotsForGroup(userId);
  }
}
