import { NestFactory } from "@nestjs/core";
import { WorkerModule } from "./worker.module";
import { Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";

const logger = new Logger("WorkerMicroservice");

async function bootstrap(): Promise<void> {
  const worker = await NestFactory.createMicroservice(WorkerModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      prefetchCount: 1,
      queue: WORKER_QUEUE_NAME,
      queueOptions: { durable: false },
    },
  });
  worker.listen(() => logger.log("Worker is listening"));
}

bootstrap();
