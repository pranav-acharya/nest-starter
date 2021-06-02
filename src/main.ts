import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ensuring all endpoints are protected from receiving incorrect data

  app.useGlobalPipes(new ValidationPipe({
    // Stripping properties - remove properties passed by client but not accepted
    // or not required by DTO interfaces
    // https://docs.nestjs.com/techniques/validation#stripping-properties
    whitelist: true,
    // Payloads coming in over the network are plain JavaScript objects.
    // Transform payloads to be objects typed according to their DTO cla  sses
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API Explorer')
    .setDescription('List of all Apisp')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();