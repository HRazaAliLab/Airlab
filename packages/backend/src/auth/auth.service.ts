import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/user.entity";
import { JwtPayloadDto, ResetPasswordDto } from "@airlab/shared/lib/auth/dto";
import { UtilsService } from "../utils/utils.service";
import { ConfigService } from "../config/config.service";
import { comparePasswordHash } from "./helpers";
import { CreateUserDto } from "@airlab/shared/lib/user/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.isActive) {
      const same = await comparePasswordHash(pass, user.password);
      if (same) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayloadDto = { userId: user.id, isAdmin: user.isAdmin };
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
            link: `${this.configService.domainLink}/reset-password?token=${passwordResetToken}`,
          },
        },
        outro: "If you did not request a password reset, no further action is required on your part.",
      },
    };
    this.utilsService.sendEmail(this.configService.fromEmail, email, "AirLab Password Recovery", content);
    return "Password recovery email sent";
  }

  async resetPassword(params: ResetPasswordDto) {
    const payload = this.jwtService.decode(params.token);
    if (payload.sub !== "PasswordReset" || !payload["email"]) {
      throw new HttpException("Invalid token", 400);
    }
    const user = await this.userService.findByEmail(payload["email"]);
    if (!user || !user.isActive) {
      throw new NotFoundException("User not found");
    }
    return this.userService.updatePassword(user.id, { password: params.newPassword });
  }

  async check(email: string) {
    const user = await this.userService.findByEmail(email);
    return { exists: !!user };
  }

  async signup(params: CreateUserDto) {
    if (!this.configService.openUserRegistration) {
      throw new HttpException("Open user resgistration is forbidden on this server", 403);
    }
    const user = await this.userService.findByEmail(params.email);
    if (user) {
      throw new HttpException("The user with this email already exists in the system", 400);
    }

    const signupConfirmationToken = this.jwtService.sign(
      { email: params.email },
      {
        subject: "SignUpConfirmation",
        issuer: "AirLab",
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );
    const content = {
      body: {
        name: params.name,
        intro: "You have received this email because an account creation was requested.",
        action: {
          instructions: "Click the button below to complete account registration:",
          button: {
            color: "#DC4D2F",
            text: "Confirm Registration",
            link: `${this.configService.domainLink}/api/v1/auth/confirm-signup/${signupConfirmationToken}`,
          },
        },
        outro: "If you did not request an account creation, no further action is required on your part.",
      },
    };
    await this.utilsService.sendEmail(
      this.configService.fromEmail,
      params.email,
      "AirLab Account Confirmation",
      content
    );
    return this.userService.signup(params);
  }

  async confirmSignup(token: string) {
    const payload = this.jwtService.decode(token);
    if (payload.sub !== "SignUpConfirmation" || !payload["email"]) {
      throw new HttpException("Invalid token", 400);
    }
    const user = await this.userService.findByEmail(payload["email"]);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userService.enableUser(user.id);
  }
}
