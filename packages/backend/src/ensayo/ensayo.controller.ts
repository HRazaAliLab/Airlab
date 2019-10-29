import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { EnsayoService } from "./ensayo.service";
import { CreateEnsayoDto, EnsayoDto, UpdateEnsayoDto } from "./ensayo.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("ensayo")
@Controller("ensayo")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class EnsayoController {
  constructor(private readonly ensayoService: EnsayoService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: EnsayoDto, isArray: true })
  findAll() {
    return this.ensayoService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: EnsayoDto })
  findById(@Param("id") id: number) {
    return this.ensayoService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: EnsayoDto })
  async create(@Body() params: CreateEnsayoDto) {
    return this.ensayoService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: EnsayoDto })
  async update(@Param("id") id: number, @Body() params: UpdateEnsayoDto) {
    return this.ensayoService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all ensayos for the group.", type: EnsayoDto })
  getAllEnsayosForGroup(@Param("groupId") groupId: number) {
    return this.ensayoService.getAllEnsayosForGroup(groupId);
  }

  @Get("userGroup/:userGroupId")
  @ApiCreatedResponse({ description: "Find all ensayos for the userGroup.", type: EnsayoDto })
  getAllEnsayosForUserGroup(@Param("userGroupId") userGroupId: number) {
    return this.ensayoService.getAllEnsayosForUserGroup(userGroupId);
  }
}
