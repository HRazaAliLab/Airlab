import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  Header,
  Res,
  Query,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateGroupDto, GroupDto, InviteDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { existsSync } from "fs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require("multer");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
  destination: function (
    req,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    cb: (error: Error | null, destination: string) => void
  ) {
    const destination = `/data/import/groups`;
    if (!existsSync(destination)) {
      mkdirp.sync(destination);
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

@Controller()
@UseGuards(AuthGuard("jwt"))
@ApiTags("groups")
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("groups")
  @ApiOperation({ summary: "Create new group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: GroupDto })
  async create(@Body() params: CreateGroupDto) {
    return this.groupService.create(params);
  }

  @Get("groups")
  @ApiOperation({ summary: "Get all groups." })
  @ApiOkResponse({ type: GroupDto, isArray: true })
  findAll() {
    return this.groupService.findAll();
  }

  @Get("groups/:id")
  @ApiOperation({ summary: "Get group by its id." })
  @ApiOkResponse({ type: GroupDto })
  findById(@Param("id") id: number) {
    return this.groupService.findById(id);
  }

  @Patch("groups/:id")
  @ApiOperation({ summary: "Update group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: GroupDto })
  async update(@Param("id") id: number, @Body() params: UpdateGroupDto) {
    return this.groupService.update(id, params);
  }

  @Delete("groups/:id")
  @ApiOperation({ summary: "Delete group." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: Number })
  async deleteById(@Request() req, @Param("id") id: number) {
    return this.groupService.deleteById(id);
  }

  @Get("export")
  @ApiOperation({ summary: "Export all data." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Header("Content-Type", "application/zip")
  async exportAllData(@Request() req, @Res() res: Response, @Query() query) {
    const zip = await this.groupService.exportAllData(query.format);
    res.attachment(`airlab.zip`);
    zip.pipe(res);
    await zip.finalize();
  }

  @Get("groups/:id/export")
  @ApiOperation({ summary: "Export group data." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Header("Content-Type", "application/zip")
  async exportGroupData(@Request() req, @Param("id") id: number, @Res() res: Response, @Query() query) {
    const zip = await this.groupService.exportGroupData(id, query.format);
    res.attachment(`group_${id}.zip`);
    zip.pipe(res);
    await zip.finalize();
  }

  @Post("groups/import")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Import group data." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: GroupDto })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: storage,
      preservePath: true,
      limits: {
        fileSize: 1000000 * 1000 * 10, // 10 GB in bytes
      },
    })
  )
  async importGroupData(@Request() req, @UploadedFile() file) {
    return this.groupService.importGroupData(file.path);
  }

  @Post("import")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Import all data." })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: GroupDto, isArray: true })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: storage,
      preservePath: true,
      limits: {
        fileSize: 1000000 * 1000 * 10, // 10 GB in bytes
      },
    })
  )
  async importAllData(@Request() req, @UploadedFile() file) {
    return this.groupService.importAllData(file.path);
  }

  @Post("groups/:id/join")
  @ApiOperation({ summary: "Send request to join the group." })
  @ApiOkResponse({ type: Boolean })
  async joinGroup(@Request() req, @Param("id") id: number) {
    const user: JwtPayloadDto = req.user;
    return this.groupService.joinGroup(user.userId, id);
  }

  @Post("groups/invite")
  @ApiOperation({ summary: "Invite user to join the group." })
  @ApiOkResponse({ type: Boolean })
  async invite(@Body() params: InviteDto) {
    return this.groupService.invite(params);
  }
}
