import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { GroupEntity } from "../group/group.entity";
import { MemberEntity } from "../member/member.entity";
import { ProteinEntity } from "../protein/protein.entity";
import { ProviderEntity } from "../provider/provider.entity";
import { SpeciesEntity } from "../species/species.entity";
import { TagEntity } from "../tag/tag.entity";
import { ValidationFileEntity } from "../validationFile/validationFile.entity";
import { CloneEntity } from "../clone/clone.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";
import { LotEntity } from "../lot/lot.entity";
import { PanelEntity } from "../panel/panel.entity";
import { ValidationEntity } from "../validation/validation.entity";
import { ClientOpts } from "redis";
import { PanelElementEntity } from "../panelElement/panelElement.entity";

export class ConfigService {
  constructor() {
    dotenv.config();
  }

  get isProduction() {
    return this.get("NODE_ENV") === "production";
  }

  get jwtSecret() {
    return this.get("JWT_SECRET");
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.get("TYPEORM_CONNECTION") as "postgres",
      host: this.get("POSTGRES_SERVER"),
      port: parseInt(this.get("TYPEORM_PORT")),
      username: this.get("POSTGRES_USER"),
      password: this.get("POSTGRES_PASSWORD"),
      database: this.get("POSTGRES_DB"),

      entities: [
        UserEntity,
        GroupEntity,
        MemberEntity,
        ProteinEntity,
        ProviderEntity,
        SpeciesEntity,
        TagEntity,
        ValidationFileEntity,
        CloneEntity,
        ConjugateEntity,
        PanelEntity,
        PanelElementEntity,
        LotEntity,
        ValidationEntity,
      ],

      migrationsTableName: "migrations",
      migrations: ["src/migrations/*.ts"],
      cli: {
        migrationsDir: "src/migrations",
      },

      ssl: false,
      synchronize: false,
      cache: {
        type: "redis",
        options: {
          host: this.get("REDIS_HOST"),
          port: Number(this.get("REDIS_PORT")),
        },
      },
    };
  }

  get redisConfig(): ClientOpts {
    return {
      host: this.get("REDIS_HOST"),
      port: Number(this.get("REDIS_PORT")),
    };
  }

  get fromEmail() {
    return this.get("EMAILS_FROM");
  }

  get domainLink() {
    const protocol = this.get("PROTOCOL");
    const domain = this.get("DOMAIN");
    return `${protocol}://${domain}`;
  }

  get openUserRegistration() {
    return Boolean(this.get("OPEN_USER_REGISTRATION"));
  }

  private get(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}
