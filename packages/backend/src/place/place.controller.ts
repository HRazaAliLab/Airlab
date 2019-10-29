import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { CreatePlaceDto, PlaceDto, UpdatePlaceDto } from "./place.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiUseTags("place")
@Controller("place")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  @ApiCreatedResponse({ description: "Find all entities.", type: PlaceDto, isArray: true })
  findAll() {
    return this.placeService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ description: "Find entity by Id.", type: PlaceDto })
  findById(@Param("id") id: number) {
    return this.placeService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Create entity.", type: PlaceDto })
  async create(@Body() params: CreatePlaceDto) {
    return this.placeService.create(params);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Updated entity.", type: PlaceDto })
  async update(@Param("id") id: number, @Body() params: UpdatePlaceDto) {
    return this.placeService.update(id, params);
  }

  @Get("group/:groupId")
  @ApiCreatedResponse({ description: "Find all places for the group.", type: PlaceDto })
  getAllPlacesForGroup(@Param("groupId") groupId: number) {
    return this.placeService.getAllPlacesForGroup(groupId);
  }
}
