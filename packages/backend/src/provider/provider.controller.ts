import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "./provider.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("provider")
@Controller("provider")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ProviderDto, isArray: true })
  findAll() {
    return this.providerService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ProviderDto })
  findById(@Param("id") id: number) {
    return this.providerService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ProviderDto })
  async create(@Body() params: CreateProviderDto) {
    return this.providerService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ProviderDto })
  async update(@Param("id") id: number, @Body() params: UpdateProviderDto) {
    return this.providerService.update(id, params);
  }
}
