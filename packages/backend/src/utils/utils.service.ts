import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import * as nodemailer from "nodemailer";
import * as Mailgen from "mailgen";
import { Content } from "mailgen";

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport(this.configService.emailConfig);

  private readonly mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "AirLab",
      link: "http://bodenmillerlab.airlaboratory.ch/",
      // Optional product logo
      logo: "http://bodenmillerlab.airlaboratory.ch/pictures/airlablogo.png",
    },
  });

  async sendEmail(from: string, to: string, subject: string, content: Content) {
    // Generate an HTML email with the provided contents
    const emailBody = this.mailGenerator.generate(content);

    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: this.configService.fromEmail, // sender address
      to: "anton.rau@gmail.com", // list of receivers
      subject: "Hello", // Subject line
      html: emailBody, // html body
    });
    console.debug(info);
  }
}
