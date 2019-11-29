import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProteinDto, ProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

@Controller()
@ApiUseTags("proteins")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ProteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Get("proteins/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ProteinDto })
  findById(@Param("id") id: number) {
    return this.proteinService.findById(id);
  }

  @Post("proteins")
  @ApiCreatedResponse({ description: "Create entity.", type: ProteinDto })
  async create(@Body() params: CreateProteinDto) {
    return this.proteinService.create(params);
  }

  @Patch("proteins/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ProteinDto })
  async update(@Param("id") id: number, @Body() params: UpdateProteinDto) {
    return this.proteinService.update(id, params);
  }

  @Get("group/:groupId/proteins")
  @ApiCreatedResponse({ description: "Find all proteins for the group.", type: ProteinDto, isArray: true })
  getAllProteinsForGroup(@Param("groupId") groupId: number) {
    return this.proteinService.getAllProteinsForGroup(groupId);
  }
}
