import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";
import { MemberService } from "../member/member.service";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { CloneService } from "../clone/clone.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("species")
@ApiBearerAuth()
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
    private readonly memberService: MemberService,
    private readonly cloneService: CloneService
  ) {}

  @Post("species")
  @ApiCreatedResponse({ description: "Create entity.", type: SpeciesDto })
  async create(@Request() req, @Body() params: CreateSpeciesDto) {
    await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.speciesService.create({ ...params });
  }

  @Get("species/:id")
  @ApiOkResponse({ description: "Find entity by Id.", type: SpeciesDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.speciesService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("species/:id")
  @ApiOkResponse({ description: "Updated entity.", type: SpeciesDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateSpeciesDto) {
    const item = await this.speciesService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.speciesService.update(id, params);
  }

  @Delete("species/:id")
  @ApiOkResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.speciesService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.speciesService.deleteById(id);
  }

  @Get("groups/:groupId/species")
  @ApiOkResponse({ description: "Find all species for the group.", type: SpeciesDto, isArray: true })
  async getGroupSpecies(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.speciesService.getGroupSpecies(groupId);
  }

  @Get("species/:id/clones")
  @ApiOkResponse({
    description: "Find all clones that have the species as a host.",
    type: CloneDto,
    isArray: true,
  })
  async getSpeciesClones(@Request() req, @Param("id") id: number) {
    const species = await this.speciesService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, species.groupId);
    return this.cloneService.getSpeciesClones(id);
  }
}
