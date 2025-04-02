import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common'; // Import Logger
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

function validateEnvVariables() {
  const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'OPENAI_API_KEY'];
  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      Logger.error(`Environment variable ${key} is missing.`);
      process.exit(1);
    }
  });
}

async function bootstrap() {
  validateEnvVariables(); // Validate environment variables
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global error handling
  app.useGlobalFilters(new AllExceptionsFilter()); // Add global exception filter

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

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
