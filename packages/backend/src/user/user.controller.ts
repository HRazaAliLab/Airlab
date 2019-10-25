import { ClassSerializerInterceptor, Controller, UseInterceptors } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { ApiUseTags } from "@nestjs/swagger";

@Crud({
  model: {
    type: UserEntity,
  },
})
@ApiUseTags("user")
@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}
}
