import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "./species.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("species")
@Controller("species")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: SpeciesDto, isArray: true })
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: SpeciesDto })
  findById(@Param("id") id: number) {
    return this.speciesService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: SpeciesDto })
  async create(@Body() params: CreateSpeciesDto) {
    return this.speciesService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: SpeciesDto })
  async update(@Param("id") id: number, @Body() params: UpdateSpeciesDto) {
    return this.speciesService.update(id, params);
  }
}