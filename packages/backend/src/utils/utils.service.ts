import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import * as nodemailer from "nodemailer";

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail() {
    const emailConfig = this.configService.emailConfig;
    const transporter = nodemailer.createTransport(emailConfig);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "\"Fred Foo 👻\" <foo@example.com>", // sender address
      to: "anton.rau@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
  }
}
