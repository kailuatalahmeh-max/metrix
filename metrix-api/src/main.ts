import type { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { PrismaErrorFilter } from './common/filters/prisma-error.filter.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('etag', false);

  app.useGlobalFilters(new PrismaErrorFilter());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Allow the Next.js website to call this API from the browser.
  app.enableCors({ origin: process.env.WEB_URL ?? 'http://localhost:3000' });
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
