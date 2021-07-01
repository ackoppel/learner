import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import {
  COIN_UPDATE_QUEUE,
  FETCH_QUEUE,
  SYNC_QUEUE,
  TOKEN_UPDATE_QUEUE,
} from '../constants/constants';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { CoinModule } from '../coin/coin.module';
import { SyncQueueTaskProcessor } from './syncQueueTask.processor';
import { FetchQueueTaskProcessor } from './fetchQueueTask.processor';
import { TokenHelper } from '../token/helper/tokenHelper';
import { CoinHelper } from '../coin/helper/coinHelper';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { CronHelper } from './helper/cron.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../coin/address/entity/address.repository';
import { TokenBalanceRepository } from '../token/tokenBalance/entity/tokenBalance.repository';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: SYNC_QUEUE,
    }),
    BullModule.registerQueueAsync({
      name: FETCH_QUEUE,
    }),
    BullModule.registerQueueAsync({
      name: TOKEN_UPDATE_QUEUE,
    }),
    BullModule.registerQueue({
      name: COIN_UPDATE_QUEUE,
    }),
    TypeOrmModule.forFeature([AddressRepository, TokenBalanceRepository]),
    TokenModule,
    CoinModule,
    ConfigModule,
  ],
  providers: [
    SyncQueueTaskProcessor,
    FetchQueueTaskProcessor,
    SyncService,
    TokenHelper,
    CoinHelper,
    CronHelper,
  ],
  controllers: [
    // todo :: probably remove me
    SyncController,
  ],
  exports: [],
})
export class SyncModule {}
