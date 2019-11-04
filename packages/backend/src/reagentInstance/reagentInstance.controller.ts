import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ReagentInstanceService } from "./reagentInstance.service";
import { ReagentInstanceDto, CreateReagentInstanceDto, UpdateReagentInstanceDto } from "./reagentInstance.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("reagentInstance")
@Controller("reagentInstance")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ReagentInstanceController {
  constructor(private readonly reagentInstanceService: ReagentInstanceService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ReagentInstanceDto, isArray: true })
  findAll() {
    return this.reagentInstanceService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ReagentInstanceDto })
  findById(@Param("id") id: number) {
    return this.reagentInstanceService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ReagentInstanceDto })
  async create(@Body() params: CreateReagentInstanceDto) {
    return this.reagentInstanceService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ReagentInstanceDto })
  async update(@Param("id") id: number, @Body() params: UpdateReagentInstanceDto) {
    return this.reagentInstanceService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({
    description: "Find all reagent instances for the group.",
    type: ReagentInstanceDto,
    isArray: true,
  })
  getAllReagentInstancesForGroup(@Param("groupId") groupId: number) {
    return this.reagentInstanceService.getAllReagentInstancesForGroup(groupId);
  }

  @Get("group/:groupId/lots")
  @ApiCreatedResponse({
    description: "Find all reagent instances with lots for the group.",
    type: ReagentInstanceDto,
    isArray: true,
  })
  getAllReagentInstancesWithLotsForGroup(@Param("groupId") groupId: number) {
    return this.reagentInstanceService.getAllReagentInstancesWithLotsForGroup(groupId);
  }

  @Get("user/:userId/lots")
  @ApiCreatedResponse({
    description: "Find all reagent instances with lots for the user.",
    type: ReagentInstanceDto,
    isArray: true,
  })
  getAllLotsForGroup(@Param("userId") userId: number) {
    return this.reagentInstanceService.getAllLotsForGroup(userId);
  }
}
