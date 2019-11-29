import { UserService } from "./user.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { CreateUserDto, ProfileDto, UpdateProfileDto, UpdateUserDto, UserDto } from "@airlab/shared/lib/user/dto";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";

@Controller()
@ApiUseTags("users")
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("users/profile")
  @ApiCreatedResponse({ description: "Get personal profile.", type: ProfileDto })
  profile(@Request() req) {
    const user: JwtPayloadDto = req.user;
    return this.userService.findById(user.userId);
  }

  @Patch("users/profile")
  @ApiCreatedResponse({ description: "Update personal profile.", type: ProfileDto })
  async updateProfile(@Request() req, @Body() params: UpdateProfileDto) {
    const user: JwtPayloadDto = req.user;
    return this.userService.update(user.userId, params);
  }

  @Get("users")
  @ApiCreatedResponse({ description: "Find all entities.", type: UserDto, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get("users/:id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: UserDto })
  findById(@Param("id") id: number) {
    return this.userService.findById(id);
  }

  @Post("users")
  @ApiCreatedResponse({ description: "Create entity.", type: UserDto })
  async create(@Body() params: CreateUserDto) {
    return this.userService.create(params);
  }

  @Patch("users/:id")
  @ApiCreatedResponse({ description: "Update entity.", type: UserDto })
  async update(@Param("id") id: number, @Body() params: UpdateUserDto) {
    return this.userService.update(id, params);
  }

  @Get("users/:id/groups")
  @ApiCreatedResponse({ description: "Find groups for the user.", type: GroupDto, isArray: true })
  getGroupsForUser(@Param("id") id: number) {
    return this.userService.getGroupsForUser(id);
  }

  @Get("users/:id/lots")
  @ApiCreatedResponse({ description: "Find all lots for the user.", type: LotDto, isArray: true })
  getAllLotsForUser(@Param("id") id: number) {
    return this.userService.getAllLotsForUser(id);
  }
}
