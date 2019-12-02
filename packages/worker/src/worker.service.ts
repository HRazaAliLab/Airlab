import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "./config/config.service";
import { SendEmailEvent } from "@airlab/shared/lib/events";

@Injectable()
export class WorkerService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(WorkerService.name);
  private readonly transporter = nodemailer.createTransport(this.configService.emailConfig);

  async sendEmail(data: SendEmailEvent) {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: data.from, // sender address
      to: data.to, // list of receivers
      subject: data.subject, // subject line
      html: data.body, // html body
    });
    this.logger.debug(info);
  }
}
