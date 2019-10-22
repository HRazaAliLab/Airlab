import * as dotenv from "dotenv";
import * as fs from "fs";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string, throwOnMissing = true): string {
    const value = this.envConfig[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.get("POSTGRES_HOST"),
      port: parseInt(this.get("POSTGRES_PORT")),
      username: this.get("POSTGRES_USER"),
      password: this.get("POSTGRES_PASSWORD"),
      database: this.get("POSTGRES_DATABASE"),

      entities: ["**/*.entity{.ts,.js}"],

      migrationsTableName: "migrations",
      migrations: ["src/migrations/*.ts"],
      cli: {
        migrationsDir: "src/migrations",
      },

      ssl: process.env.NODE_ENV === "production",
    };
  }
}
