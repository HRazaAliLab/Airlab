import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProteinDto, ProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

@ApiUseTags("protein")
@Controller("protein")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ProteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ProteinDto, isArray: true })
  findAll() {
    return this.proteinService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ProteinDto })
  findById(@Param("id") id: number) {
    return this.proteinService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ProteinDto })
  async create(@Body() params: CreateProteinDto) {
    return this.proteinService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ProteinDto })
  async update(@Param("id") id: number, @Body() params: UpdateProteinDto) {
    return this.proteinService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all proteins for the group.", type: ProteinDto, isArray: true })
  getAllProteinsForGroup(@Param("groupId") groupId: number) {
    return this.proteinService.getAllProteinsForGroup(groupId);
  }
}
