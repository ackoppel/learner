import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import {
  EVENT_COIN_BALANCE_SYNC_REQUESTED,
  EVENT_COIN_PRICE_SYNC_REQUESTED,
  EVENT_TOKEN_BALANCE_SYNC_REQUESTED,
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
import { CronHelper } from './helper/cron.helper';
import { TokenBalanceRepository } from '../token/tokenBalance/entity/tokenBalance.repository';
import { AddressRepository } from '../coin/address/entity/address.repository';
import { SyncCoinBalanceRequestedEvent } from './event/syncCoinBalanceRequested.event';
import { SyncTokenBalanceRequestedEvent } from './event/syncTokenBalanceRequested.event';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SyncService implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue<SyncQueueItem>,
    private configService: ConfigService,
    @InjectQueue(FETCH_QUEUE) private fetchQueue: Queue<SyncQueueItem>,
    private eventEmitter: EventEmitter2,
    private coinService: CoinService,
    private tokenService: TokenService,
    private cronHelper: CronHelper,
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.cronHelper.pauseSync();
      this.logger.verbose('Sync service paused');
    } else {
      await this.cronHelper.startSync();
      this.logger.verbose('Starting sync service');
    }
  }

  // todo :: think about token logo sync

  async startPriceSync() {
    this.logger.verbose('Starting Price Sync');
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

  async startBalanceSync() {
    this.logger.verbose('Starting Balance Sync');
    const coinBalances = await this.addressRepository.getAllAddressesForSync();
    const tokenBalances =
      await this.tokenBalanceRepository.getAllBalancesForSync();
    coinBalances.forEach((balance) => {
      this.eventEmitter.emit(
        EVENT_COIN_BALANCE_SYNC_REQUESTED,
        new SyncCoinBalanceRequestedEvent(balance),
      );
    });
    tokenBalances.forEach((tokenBalance) => {
      this.eventEmitter.emit(
        EVENT_TOKEN_BALANCE_SYNC_REQUESTED,
        new SyncTokenBalanceRequestedEvent(tokenBalance),
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

  @OnEvent(EVENT_TOKEN_BALANCE_SYNC_REQUESTED)
  async syncTokenBalance(payload: SyncTokenBalanceRequestedEvent) {
    this.logger.log(
      `Adding ${payload.tokenBalance.address.contractAddress} to token ${payload.tokenBalance.token.name} balance fetch queue`,
    );
    await this.fetchQueue.add(
      SyncTaskType.SyncTokenBalance,
      {
        payload: { tokenBalance: payload.tokenBalance },
      },
      {
        removeOnComplete: true,
      },
    );
  }

  @OnEvent(EVENT_COIN_BALANCE_SYNC_REQUESTED)
  async syncCoinBalance(payload: SyncCoinBalanceRequestedEvent) {
    this.logger.log(
      `Adding ${payload.address.contractAddress} to ${payload.address.coin.name} balance fetch queue`,
    );
    await this.fetchQueue.add(
      SyncTaskType.SyncCoinBalance,
      {
        payload: { address: payload.address },
      },
      {
        removeOnComplete: true,
      },
    );
  }
}
