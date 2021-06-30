import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import {
  EVENT_COIN_PRICE_SYNC_REQUESTED,
  EVENT_TOKEN_PRICE_SYNC_REQUESTED,
  FETCH_QUEUE,
  SYNC_QUEUE,
} from '../constants/constants';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CoinService } from '../coin/coin.service';
import { TokenService } from '../token/token.service';
import { SyncCoinPriceRequestedEvent } from './event/syncCoinPriceRequested.event';
import { SyncTokenPriceRequestedEvent } from './event/syncTokenPriceRequested.event';
import {
  SyncQueueItem,
  SyncTaskType,
} from './interface/syncQueueItem.interface';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue<SyncQueueItem>,
    private configService: ConfigService,
    @InjectQueue(FETCH_QUEUE) private fetchQueue: Queue<SyncQueueItem>,
    private eventEmitter: EventEmitter2,
    private coinService: CoinService,
    private tokenService: TokenService,
  ) {}

  async startPriceSync() {
    this.logger.log('Starting Price Sync');
    const coins = await this.coinService.getCoins();
    const tokens = await this.tokenService.getExistingTokenList();
    coins.forEach((coin) => {
      this.eventEmitter.emit(
        EVENT_COIN_PRICE_SYNC_REQUESTED,
        new SyncCoinPriceRequestedEvent(coin),
      );
    });
    tokens.forEach((token) => {
      this.eventEmitter.emit(
        EVENT_TOKEN_PRICE_SYNC_REQUESTED,
        new SyncTokenPriceRequestedEvent(token),
      );
    });
  }

  @OnEvent(EVENT_COIN_PRICE_SYNC_REQUESTED)
  async syncCoinPrice(payload: SyncCoinPriceRequestedEvent) {
    this.logger.log(`Adding ${payload.coin.name} to fetch queue`);
    await this.fetchQueue.add(
      SyncTaskType.SyncCoinPrice,
      {
        payload: {
          chain: payload.coin.name,
        },
      },
      {
        removeOnComplete: true,
      },
    );
  }

  @OnEvent(EVENT_TOKEN_PRICE_SYNC_REQUESTED)
  async syncTokenPrice(payload: SyncTokenPriceRequestedEvent) {
    this.logger.log(`Adding ${payload.token.name} to fetch queue`);
    await this.fetchQueue.add(
      SyncTaskType.SyncTokenPrice,
      {
        payload: {
          token: payload.token,
        },
      },
      {
        removeOnComplete: true,
      },
    );
  }
}
