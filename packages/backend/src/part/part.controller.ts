import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PartService } from "./part.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreatePartDto, PartDto, UpdatePartDto } from "@airlab/shared/lib/part/dto";

@ApiUseTags("part")
@Controller("part")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: PartDto, isArray: true })
  findAll() {
    return this.partService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PartDto })
  findById(@Param("id") id: number) {
    return this.partService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: PartDto })
  async create(@Body() params: CreatePartDto) {
    return this.partService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PartDto })
  async update(@Param("id") id: number, @Body() params: UpdatePartDto) {
    return this.partService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all parts for the group.", type: PartDto, isArray: true })
  getAllPartsForGroup(@Param("groupId") groupId: number) {
    return this.partService.getAllPartsForGroup(groupId);
  }

  @Get("experiment/:experimentId")
  @ApiCreatedResponse({ description: "Find all parts for the experiment.", type: PartDto, isArray: true })
  getAllPartsForExperiment(@Param("experimentId") experimentId: number) {
    return this.partService.getAllPartsForExperiment(experimentId);
  }
}
