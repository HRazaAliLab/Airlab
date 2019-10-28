import { ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Crud({
  model: {
    type: UserEntity,
  },
})
@ApiUseTags("user")
@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly service: UserService) {}
}
