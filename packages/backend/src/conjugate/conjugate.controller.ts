import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Controller()
@ApiUseTags("conjugates")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ConjugateController {
  constructor(private readonly conjugateService: ConjugateService) {}

  @Get("conjugates")
  @ApiCreatedResponse({ description: "Find all entities.", type: ConjugateDto, isArray: true })
  findAll() {
    return this.conjugateService.findAll();
  }

  @Get("conjugates/accessible")
  @ApiCreatedResponse({
    description: "Find all conjugates accessible for the user.",
    type: ConjugateDto,
    isArray: true,
  })
  getAccessibleConjugates(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.conjugateService.getAccessibleConjugates(user.userId);
  }

  @Get("conjugates/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ConjugateDto })
  findById(@Param("id") id: number) {
    return this.conjugateService.findById(id);
  }

  @Post("conjugates")
  @ApiCreatedResponse({ description: "Create entity.", type: ConjugateDto })
  async create(@Body() params: CreateConjugateDto) {
    return this.conjugateService.create(params);
  }

  @Patch("conjugates/:id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ConjugateDto })
  async update(@Param("id") id: number, @Body() params: UpdateConjugateDto) {
    return this.conjugateService.update(id, params);
  }
}
