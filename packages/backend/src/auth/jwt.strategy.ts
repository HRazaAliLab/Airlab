import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.jwtSecret,
    });

    async (payload: any, next: Function) => await this.validate(payload, next);
  }

  async validate(payload: JwtPayloadDto, done: Function) {
    return { userId: payload.userId, isAdmin: payload.isAdmin };
  }
}
