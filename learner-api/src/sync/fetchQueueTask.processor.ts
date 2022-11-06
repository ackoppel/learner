import {
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import {
  COIN_UPDATE_QUEUE,
  FETCH_QUEUE,
  TOKEN_UPDATE_QUEUE,
} from '../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenHelper } from '../token/helper/tokenHelper';
import { CoinHelper } from '../coin/helper/coinHelper';
import {
  SyncCoinBalancePayload,
  SyncCoinPricePayload,
  SyncQueueItem,
  SyncTaskType,
  SyncTokenBalancePayload,
  SyncTokenPricePayload,
} from './interface/syncQueueItem.interface';
import { Job, Queue } from 'bull';
import { validateOrReject } from 'class-validator';
import { UpdateTokenTaskType } from '../token/sync/tokenUpdateQueueItem.interface';
import { UpdateCoinTaskType } from '../coin/sync/coinUpdateQueueItem.interface';

@Processor(FETCH_QUEUE)
export class FetchQueueTaskProcessor implements OnModuleInit {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(COIN_UPDATE_QUEUE) private coinUpdateQueue: Queue,
    @InjectQueue(TOKEN_UPDATE_QUEUE) private tokenUpdateQueue: Queue,
    @InjectQueue(FETCH_QUEUE) private fetchQueue: Queue<SyncQueueItem>,
    private configService: ConfigService,
    private tokenHelper: TokenHelper,
    private coinHelper: CoinHelper,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.fetchQueue.pause();
      this.logger.warn('Pausing fetch queue');
    } else {
      await this.fetchQueue.resume();
      this.logger.warn('Resuming fetch queue');
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job with data: ${JSON.stringify(job.data)}`);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(SyncTaskType.SyncTokenPrice)
  async syncTokenPrice(job: Job<SyncQueueItem>) {
    const payload = job.data.payload as SyncTokenPricePayload;
    const tokenPrice = await this.tokenHelper.fetchExternalTokenPrice(
      payload.token.address,
      payload.token.coin.name,
    );
    await validateOrReject(tokenPrice);
    await this.tokenUpdateQueue.add(
      UpdateTokenTaskType.UpdateTokenPrice,
      {
        payload: {
          tokenPrice,
          coin: payload.token.coin,
        },
      },
      {
        removeOnComplete: true,
      },
    );
    return this.TASK_OK;
  }

  @Process(SyncTaskType.SyncCoinPrice)
  async syncCoinPrice(job: Job<SyncQueueItem>) {
    const payload = job.data.payload as SyncCoinPricePayload;
    const coinPrice = await this.coinHelper.fetchExternalCoinPrice(
      payload.chain,
    );
    await validateOrReject(coinPrice);
    await this.coinUpdateQueue.add(
      UpdateCoinTaskType.UpdateCoinPrice,
      {
        payload: coinPrice,
      },
      {
        removeOnComplete: true,
      },
    );
    return this.TASK_OK;
  }

  @Process(SyncTaskType.SyncTokenBalance)
  async syncTokenBalance(job: Job<SyncQueueItem>) {
    const payload = job.data.payload as SyncTokenBalancePayload;
    const tokenBalance = await this.tokenHelper.fetchExternalTokenBalance(
      payload.tokenBalance.address.contractAddress,
      payload.tokenBalance.token.address,
      payload.tokenBalance.token.coin.name,
    );
    await validateOrReject(tokenBalance);
    await this.tokenUpdateQueue.add(
      UpdateTokenTaskType.UpdateTokenBalance,
      {
        payload: {
          tokenBalance: payload.tokenBalance,
          update: tokenBalance,
        },
      },
      { removeOnComplete: true },
    );
    return this.TASK_OK;
  }

  @Process(SyncTaskType.SyncCoinBalance)
  async syncCoinBalance(job: Job<SyncQueueItem>) {
    const payload = job.data.payload as SyncCoinBalancePayload;
    const coinBalance = await this.coinHelper.fetchExternalCoinBalance(
      payload.address.contractAddress,
      payload.address.coin.name,
    );
    await validateOrReject(coinBalance);
    await this.coinUpdateQueue.add(
      UpdateCoinTaskType.UpdateCoinBalance,
      {
        payload: {
          update: coinBalance,
          address: payload.address,
        },
      },
      { removeOnComplete: true },
    );
    return this.TASK_OK;
  }
}
