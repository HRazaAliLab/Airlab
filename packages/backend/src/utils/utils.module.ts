import { Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "WORKER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          prefetchCount: 1,
          queue: WORKER_QUEUE_NAME,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
