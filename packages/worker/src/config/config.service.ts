import * as dotenv from "dotenv";
import * as SMTPConnection from "nodemailer/lib/smtp-connection";

export class ConfigService {
  constructor() {
    dotenv.config();
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

  private get(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}
