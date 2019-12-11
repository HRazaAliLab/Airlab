import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./utils/logging.interceptor";
import { WsAdapter } from "@nestjs/platform-ws";

const apiRoot = "api/v1";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix(apiRoot);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useWebSocketAdapter(new WsAdapter(app));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AirLab API")
    .setDescription("AirLab API description")
    .setVersion("1.0")
    .setBasePath(apiRoot)
    .addBearerAuth("Authorization", "header", "apiKey")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
