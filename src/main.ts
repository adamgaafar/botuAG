import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common'; // Import Logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global error handling
  app.useGlobalFilters();

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable logging
  Logger.log('Application is starting...'); // Use Logger directly

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Botu Platform API')
    .setDescription('API documentation for the Botu Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`); // Log application URL
}
bootstrap();
