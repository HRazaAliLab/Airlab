import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    const user = await this.userRepository.findOne(request.user.userId);
    if (!user) {
      return false;
    }

    if (roles.includes("admin")) {
      if (user.isAdmin) {
        return true;
      }
    }

    if (roles.includes("member")) {
      const groupId = Number(request.params.groupId);
      if (!groupId) {
        return false;
      }
      for (const groupUser of user.groupUsers) {
        if (groupUser.groupId === groupId) {
          return true;
        }
      }
    }

    return false;
  }
}
