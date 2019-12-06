import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateProteinDto, ProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";
import { MemberService } from "../member/member.service";

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiUseTags("proteins")
@ApiBearerAuth()
export class ProteinController {
  constructor(private readonly proteinService: ProteinService, private readonly memberService: MemberService) {}

  @Post("proteins")
  @ApiCreatedResponse({ description: "Create entity.", type: ProteinDto })
  async create(@Request() req, @Body() params: CreateProteinDto) {
    const member = await this.memberService.checkMemberPermissions(req.user.userId, params.groupId);
    return this.proteinService.create({ ...params, createdBy: member.id });
  }

  @Get("proteins/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ProteinDto })
  async findById(@Request() req, @Param("id") id: number) {
    const item = await this.proteinService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return item;
  }

  @Patch("proteins/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ProteinDto })
  async update(@Request() req, @Param("id") id: number, @Body() params: UpdateProteinDto) {
    const item = await this.proteinService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.proteinService.update(id, params);
  }

  @Delete("proteins/:id")
  @ApiCreatedResponse({ description: "Delete entity by Id.", type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    const item = await this.proteinService.findById(id);
    await this.memberService.checkMemberPermissions(req.user.userId, item.groupId);
    return this.proteinService.deleteById(id);
  }

  @Get("groups/:groupId/proteins")
  @ApiCreatedResponse({ description: "Find all proteins for the group.", type: ProteinDto, isArray: true })
  async getGroupProteins(@Request() req, @Param("groupId") groupId: number) {
    await this.memberService.checkMemberPermissions(req.user.userId, groupId);
    return this.proteinService.getGroupProteins(groupId);
  }
}
