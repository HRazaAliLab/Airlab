import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Group } from "../group/group.entity";

export class ConfigService {
  constructor() {
    dotenv.config();
    // console.debug(process.env);
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

      entities: [User, Group],

      migrationsTableName: "migrations",
      migrations: ["src/migrations/*.ts"],
      cli: {
        migrationsDir: "src/migrations",
      },

      ssl: this.isProduction,
      synchronize: false,
    };
  }
}
