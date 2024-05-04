import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = process.env.PORT || 3000;

  const origin = process.env.CLIENT_ORIGIN;

  const corsOptions: CorsOptions = {
    origin,
    credentials: true, // Enable reading cookies from the request
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60 * 5, // Set the maximum age of preflight requests to 5 days
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(port, () =>
    console.log(`📢 Server starting on: http://localhost:${port}/ ⚡️`),
  );
}
bootstrap();
