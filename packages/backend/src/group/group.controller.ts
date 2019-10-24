import { Body, Controller, Get, Post } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./group.dto";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Post()
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }
}
