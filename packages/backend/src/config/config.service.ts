import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import * as SMTPConnection from "nodemailer/lib/smtp-connection";
import { ProteinEntity } from "../protein/protein.entity";
import { ProviderEntity } from "../provider/provider.entity";
import { SpeciesEntity } from "../species/species.entity";
import { TagEntity } from "../tag/tag.entity";
import { FileEntity } from "../file/file.entity";
import { CloneEntity } from "../clone/clone.entity";
import { ReagentEntity } from "../reagent/reagent.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";
import { LotEntity } from "../lot/lot.entity";
import { PanelEntity } from "../panel/panel.entity";

export class ConfigService {
  constructor() {
    dotenv.config();
  }

  private get(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  get isProduction() {
    return this.get("NODE_ENV") === "production";
  }

  get jwtSecret() {
    return this.get("JWT_SECRET");
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.get("DB_TYPE") as any,
      host: this.get("DB_HOST"),
      port: parseInt(this.get("DB_PORT")),
      username: this.get("DB_USERNAME"),
      password: this.get("DB_PASSWORD"),
      database: this.get("DB_DATABASE"),

      entities: [
        UserEntity,
        GroupEntity,
        GroupUserEntity,
        ProteinEntity,
        ProviderEntity,
        SpeciesEntity,
        TagEntity,
        FileEntity,
        CloneEntity,
        ReagentEntity,
        ConjugateEntity,
        PanelEntity,
        LotEntity,
      ],

      migrationsTableName: "migrations",
      migrations: ["src/migrations/*.ts"],
      cli: {
        migrationsDir: "src/migrations",
      },

      ssl: this.isProduction,
      synchronize: false,
    };
  }

  get emailConfig(): SMTPConnection.Options {
    return {
      host: this.get("SMTP_HOST"),
      port: parseInt(this.get("SMTP_PORT"), 10),
      auth: {
        user: this.get("SMTP_USER"),
        pass: this.get("SMTP_PASSWORD"),
      },
      ignoreTLS: true,
    };
  }

  get fromEmail() {
    return this.get("EMAILS_FROM_EMAIL");
  }
}
