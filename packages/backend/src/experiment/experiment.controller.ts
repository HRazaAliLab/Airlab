import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ExperimentService } from "./experiment.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateExperimentDto, ExperimentDto, UpdateExperimentDto } from "@airlab/shared/lib/experiment/dto";

@ApiUseTags("experiment")
@Controller("experiment")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ExperimentDto, isArray: true })
  findAll() {
    return this.experimentService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ExperimentDto })
  findById(@Param("id") id: number) {
    return this.experimentService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ExperimentDto })
  async create(@Body() params: CreateExperimentDto) {
    return this.experimentService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ExperimentDto })
  async update(@Param("id") id: number, @Body() params: UpdateExperimentDto) {
    return this.experimentService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all experiments for the group.", type: ExperimentDto, isArray: true })
  getAllExperimentsForGroup(@Param("groupId") groupId: number) {
    return this.experimentService.getAllExperimentsForGroup(groupId);
  }

  @Get("groupUser/:groupUserId")
  @ApiCreatedResponse({ description: "Find all experiments for the group user.", type: ExperimentDto, isArray: true })
  getAllExperimentsForGroupUser(@Param("groupUserId") groupUserId: number) {
    return this.experimentService.getAllExperimentsForGroupUser(groupUserId);
  }
}
