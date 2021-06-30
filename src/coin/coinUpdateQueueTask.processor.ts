import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { COIN_UPDATE_QUEUE } from '../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinRepository } from './entity/coin.repository';
import {
  UpdateCoinQueueItem,
  UpdateCoinTaskType,
} from './coinUpdateQueueItem.interface';
import { ConnectorCoinPrice } from '../externalApi/model/coinPrice.connector';
import { ConfigService } from '@nestjs/config';

@Processor(COIN_UPDATE_QUEUE)
export class CoinUpdateQueueTaskProcessor implements OnModuleInit {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(COIN_UPDATE_QUEUE)
    private coinUpdateQueue: Queue<UpdateCoinQueueItem>,
    @InjectRepository(CoinRepository) private coinRepository: CoinRepository,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.coinUpdateQueue.pause();
    } else {
      await this.coinUpdateQueue.resume();
    }
  }

  @OnQueueActive()
  onActive(job: Job<UpdateCoinQueueItem>) {
    this.logger.log(`Processing update with data: ${job.data}`);
  }

  @Process(UpdateCoinTaskType.UpdateCoinPrice)
  async updateCoinPrice(job: Job<UpdateCoinQueueItem>) {
    const coinPrice = job.data.payload as ConnectorCoinPrice;
    await this.coinRepository.injectOrUpdateCoin(coinPrice);
    return this.TASK_OK;
  }
}
