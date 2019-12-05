import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("species")
@ApiBearerAuth()
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService, private readonly groupUserService: GroupUserService) {}

  @Post("species")
  @ApiCreatedResponse({ description: "Create entity.", type: SpeciesDto })
  async create(@Request() req, @Body() params: CreateSpeciesDto) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, params.groupId);
    return this.speciesService.create({ ...params });
  }

  @Get("species/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: SpeciesDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.speciesService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("species/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: SpeciesDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateSpeciesDto) {
    const item = await this.speciesService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.speciesService.update(id, params);
  }

  @Delete("species/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.speciesService.findById(id);
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, item.groupId);
    return this.speciesService.deleteById(id);
  }

  @Get("groups/:groupId/species")
  @ApiCreatedResponse({ description: "Find all species for the group.", type: SpeciesDto, isArray: true })
  async getGroupSpecies(@Request() req, @Param("groupId") groupId: number) {
    await this.groupUserService.checkGroupUserPermissions(req.user.userId, groupId);
    return this.speciesService.getGroupSpecies(groupId);
  }
}
