import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import { UserEntity } from "../user/user.entity";

export interface JwtPayload {
  userId: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user) {
      const hash = crypto
        .createHash("sha1")
        .update(pass)
        .digest("hex");
      if (user.password === hash) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = { userId: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload, {
        subject: user.id.toString(),
        issuer: "AirLab",
        expiresIn: "365d",
      }),
    };
  }
}
