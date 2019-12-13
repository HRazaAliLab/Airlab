import { Test, TestingModule } from "@nestjs/testing";
import { UtilsService } from "./utils.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";
import { ConfigModule } from "../config/config.module";

describe(UtilsService.name, () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        ConfigModule,
      ],
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
