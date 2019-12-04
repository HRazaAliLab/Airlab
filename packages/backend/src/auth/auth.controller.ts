import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiUseTags } from "@nestjs/swagger";
import { ResetPasswordDto } from "@airlab/shared/lib/auth/dto";
import { CreateUserDto } from "@airlab/shared/lib/user/dto";

@Controller()
@ApiUseTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("auth/password-recovery/:email")
  async passwordRecovery(@Param("email") email: string) {
    return this.authService.passwordRecovery(email);
  }

  @Post("auth/reset-password")
  async passwordReset(@Body() params: ResetPasswordDto) {
    return this.authService.resetPassword(params);
  }

  @Get("auth/check/:email")
  async check(@Param("email") email: string) {
    return this.authService.check(email);
  }

  @Post("auth/signup")
  async signup(@Body() params: CreateUserDto) {
    const user = await this.authService.signup(params);
    const { password, ...result } = user;
    return result;
  }
}
