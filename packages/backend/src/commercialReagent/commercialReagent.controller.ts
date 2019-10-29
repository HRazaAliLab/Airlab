import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CommercialReagentService } from "./commercialReagent.service";
import { CommercialReagentDto, CreateCommercialReagentDto, UpdateCommercialReagentDto } from "./commercialReagent.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("commercialReagent")
@Controller("commercialReagent")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class CommercialReagentController {
  constructor(private readonly commercialReagentService: CommercialReagentService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: CommercialReagentDto, isArray: true })
  findAll() {
    return this.commercialReagentService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: CommercialReagentDto })
  findById(@Param("id") id: number) {
    return this.commercialReagentService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: CommercialReagentDto })
  async create(@Body() params: CreateCommercialReagentDto) {
    return this.commercialReagentService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: CommercialReagentDto })
  async update(@Param("id") id: number, @Body() params: UpdateCommercialReagentDto) {
    return this.commercialReagentService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all commercial reagents for the group.", type: CommercialReagentDto })
  getAllCommercialReagentsForGroup(@Param("groupId") groupId: number) {
    return this.commercialReagentService.getAllCommercialReagentsForGroup(groupId);
  }
}
