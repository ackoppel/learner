import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { BullBoardProvider } from './bullBoard/bullBoard.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const bullBoardProvider = app.get(BullBoardProvider);
  const basePath = configService.get<string>('bullBoard.basePath');
  app.use(
    '/admin/queues',
    (req, res, next) => {
      req.proxyUrl = basePath + '/admin/queues';
      next();
    },
    basicAuth({
      users: {
        [configService.get<string>('bullBoard.username')]:
          configService.get<string>('bullBoard.password'),
      },
      challenge: true,
    }),
    bullBoardProvider.router,
  );

  await app.listen(3000);
}

bootstrap();
