import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import * as redis from "redis";
import { UPDATES_CHANNEL_NAME } from "@airlab/shared/lib/events/channels";
import { EventsGateway } from "../events/events.gateway";
import { Message } from "@airlab/shared/lib/events/message";

@Injectable()
export class PubSubService {
  private readonly logger = new Logger(PubSubService.name);
  private readonly pub;
  private readonly sub;

  constructor(private readonly configService: ConfigService, private readonly eventsGateway: EventsGateway) {
    this.pub = redis.createClient(this.configService.redisConfig);
    this.sub = redis.createClient(this.configService.redisConfig);
    this.sub.on("message", (channel, message) => this.messageHandler(channel, message));
    this.sub.subscribe(UPDATES_CHANNEL_NAME);
  }

  broadcastMessage(channel: string, message) {
    this.pub.publish(channel, "HELLO");
  }

  private messageHandler(channel: string, message: string) {
    this.logger.log(`Channel:  ${channel}; message: ${message}`);
    this.eventsGateway.sendGroupMessage(new Message(2, "info", message));
  }
}
