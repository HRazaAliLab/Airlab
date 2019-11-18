import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateValidationDto, UpdateValidationDto, ValidationDto } from "@airlab/shared/lib/validation/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { GroupUserService } from "../groupUser/groupUser.service";

@ApiUseTags("validation")
@Controller("validation")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class ValidationController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly groupUserService: GroupUserService
  ) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: ValidationDto, isArray: true })
  findAll() {
    return this.validationService.findAll();
  }

  @Get("getAllValidationsForGroup")
  @ApiCreatedResponse({ description: "Find all validations for the group.", type: ValidationDto, isArray: true })
  getAllValidationsForGroup(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.validationService.getAllValidationsForGroup(user.userId);
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: ValidationDto })
  findById(@Param("id") id: number) {
    return this.validationService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: ValidationDto })
  async create(@Request() req, @Body() params: CreateValidationDto) {
    const user: JwtPayloadDto = req.user;
    const groupUser = await this.groupUserService.findByUserIdAndGroupId(user.userId, params.groupId);
    return this.validationService.create({ ...params, createdBy: groupUser.id });
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: ValidationDto })
  async update(@Param("id") id: number, @Body() params: UpdateValidationDto) {
    return this.validationService.update(id, params);
  }
}
