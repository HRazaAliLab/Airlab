import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./utils/logging.interceptor";
import { WsAdapter } from "@nestjs/platform-ws";

const apiRoot = "/api/v1";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      "http://localhost",
      "ws://localhost",
      "http://localhost:9999",
      "https://localhost",
      "https://localhost:9999",
      "http://130.60.24.75",
      "https://130.60.24.75",
      "http://172.23.37.252",
      "https://172.23.37.252",
      "http://airlab.bio",
      "https://airlab.bio",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  app.setGlobalPrefix(apiRoot);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useWebSocketAdapter(new WsAdapter(app));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AirLab API")
    .setDescription("AirLab API description")
    .setVersion("1.0")
    .addServer(apiRoot)
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
