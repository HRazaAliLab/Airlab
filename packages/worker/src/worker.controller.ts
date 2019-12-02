import { Controller, Logger } from "@nestjs/common";
import { WorkerService } from "./worker.service";
import { EventPattern } from "@nestjs/microservices";
import { SEND_EMAIL_MESSAGE } from "@airlab/shared/lib/constants";
import { SendEmailEvent } from "@airlab/shared/lib/events";

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  private readonly logger = new Logger(WorkerController.name);

  @EventPattern(SEND_EMAIL_MESSAGE)
  async handleSendMail(data: SendEmailEvent) {
    this.logger.debug(data);
    await this.workerService.sendEmail(data);
  }
}
