import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/appConfig';
import { ProfileModule } from './profile/profile.module';
import { TokenModule } from './token/token.module';
import { CoinModule } from './coin/coin.module';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from './bullBoard/bullBoard.module';
import {
  COIN_UPDATE_QUEUE,
  FETCH_QUEUE,
  SYNC_QUEUE,
  TOKEN_UPDATE_QUEUE,
} from './constants/constants';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        database: configService.get<string>('db.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: SYNC_QUEUE,
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
        },
        limiter: {
          max: configService.get<number>('queue.limiter'),
          duration: configService.get<number>('queue.duration'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: FETCH_QUEUE,
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
        },
        limiter: {
          max: configService.get<number>('queue.limiter'),
          duration: configService.get<number>('queue.duration'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: TOKEN_UPDATE_QUEUE,
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
        },
        limiter: {
          max: configService.get<number>('queue.limiter'),
          duration: configService.get<number>('queue.duration'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: COIN_UPDATE_QUEUE,
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db'),
        },
        limiter: {
          max: configService.get<number>('queue.limiter'),
          duration: configService.get<number>('queue.duration'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
    EventEmitterModule.forRoot(),
    BullBoardModule,
    SyncModule,
    AuthModule,
    TokenModule,
    ProfileModule,
    CoinModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
