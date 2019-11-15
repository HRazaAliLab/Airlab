import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateValidationDto, UpdateValidationDto, ValidationDto } from "@airlab/shared/lib/validation/dto";

@ApiUseTags("validation")
@Controller("validation")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ValidationDto, isArray: true })
  findAll() {
    return this.validationService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ValidationDto })
  findById(@Param("id") id: number) {
    return this.validationService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ValidationDto })
  async create(@Body() params: CreateValidationDto) {
    return this.validationService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ValidationDto })
  async update(@Param("id") id: number, @Body() params: UpdateValidationDto) {
    return this.validationService.update(id, params);
  }
}
