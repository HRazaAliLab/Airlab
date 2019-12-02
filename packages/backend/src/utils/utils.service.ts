import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import * as Mailgen from "mailgen";
import { ClientProxy } from "@nestjs/microservices";
import { SEND_EMAIL_MESSAGE } from "@airlab/shared/lib/constants";
import { SendEmailEvent } from "@airlab/shared/lib/events";

@Injectable()
export class UtilsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject("WORKER_SERVICE") private readonly worker: ClientProxy
  ) {}

  private readonly logger = new Logger(UtilsService.name);

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

  async sendEmail(from: string, to: string, subject: string, content: Mailgen.Content) {
    // Generate an HTML email with the provided contents
    const emailBody = this.mailGenerator.generate(content);

    this.worker.emit(SEND_EMAIL_MESSAGE, {
      from: "anton.rau@uzh.ch",
      to: "anton.rau@gmail.com",
      subject: "AirLab Test",
      body: "test message",
    } as SendEmailEvent);
  }
}
