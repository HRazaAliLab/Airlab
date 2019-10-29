import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AntibodyService } from "./antibody.service";
import { AntibodyDto, CreateAntibodyDto, UpdateAntibodyDto } from "./antibody.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("antibody")
@Controller("antibody")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class AntibodyController {
  constructor(private readonly antibodyService: AntibodyService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: AntibodyDto, isArray: true })
  findAll() {
    return this.antibodyService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: AntibodyDto })
  findById(@Param("id") id: number) {
    return this.antibodyService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: AntibodyDto })
  async create(@Body() params: CreateAntibodyDto) {
    return this.antibodyService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: AntibodyDto })
  async update(@Param("id") id: number, @Body() params: UpdateAntibodyDto) {
    return this.antibodyService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all antibodies for the group.", type: AntibodyDto })
  getAllAntibodiesForGroup(@Param("groupId") groupId: number) {
    return this.antibodyService.getAllAntibodiesForGroup(groupId);
  }
}
