import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import { UserEntity } from "../user/user.entity";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { UtilsService } from "../utils/utils.service";
import { ConfigService } from "../config/config.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService
  ) {}

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
    const payload: JwtPayloadDto = { userId: user.id };
    const token = this.jwtService.sign(payload, {
      subject: user.id.toString(),
      issuer: "AirLab",
      expiresIn: "7d",
    });
    return {
      token: token,
    };
  }

  async passwordRecovery(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.isActive) {
      throw new NotFoundException("User not found");
    }
    const passwordResetToken = this.jwtService.sign(
      { email: email },
      {
        subject: "PasswordReset",
        issuer: "AirLab",
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );
    const content = {
      body: {
        name: user.name,
        intro: "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: `${this.configService.domainLink}/auth/reset-password?token=${passwordResetToken}`,
          },
        },
        outro: "If you did not request a password reset, no further action is required on your part.",
      },
    };
    this.utilsService.sendEmail(this.configService.fromEmail, email, "AirLab Password Recovery", content);
    return "Password recovery email sent";
  }
}
