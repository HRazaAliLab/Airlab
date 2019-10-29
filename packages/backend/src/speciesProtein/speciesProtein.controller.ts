import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { SpeciesProteinService } from "./speciesProtein.service";
import { CreateSpeciesProteinDto, SpeciesProteinDto, UpdateSpeciesProteinDto } from "./speciesProtein.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("speciesProtein")
@Controller("speciesProtein")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class SpeciesProteinController {
  constructor(private readonly speciesProteinService: SpeciesProteinService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: SpeciesProteinDto, isArray: true })
  findAll() {
    return this.speciesProteinService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: SpeciesProteinDto })
  findById(@Param("id") id: number) {
    return this.speciesProteinService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: SpeciesProteinDto })
  async create(@Body() params: CreateSpeciesProteinDto) {
    return this.speciesProteinService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: SpeciesProteinDto })
  async update(@Param("id") id: number, @Body() params: UpdateSpeciesProteinDto) {
    return this.speciesProteinService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all species proteins for the group.", type: SpeciesProteinDto })
  getAllSpeciesProteinsForGroup(@Param("groupId") groupId: number) {
    return this.speciesProteinService.getAllSpeciesProteinsForGroup(groupId);
  }
}
