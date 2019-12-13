import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    const user = await this.userService.findById(request.user.userId);
    if (!user) {
      return false;
    }

    if (roles.includes("admin")) {
      if (user.isAdmin) {
        return true;
      }
    }

    return false;
  }
}
