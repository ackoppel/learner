import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { COIN_UPDATE_QUEUE } from '../constants/constants';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinRepository } from './entity/coin.repository';
import {
  UpdateCoinQueueItem,
  UpdateCoinTaskType,
} from './coinUpdateQueueItem.interface';
import { ConnectorCoinPrice } from '../externalApi/model/coinPrice.connector';

@Processor(COIN_UPDATE_QUEUE)
export class CoinUpdateQueueTaskProcessor {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(COIN_UPDATE_QUEUE)
    private coinUpdateQueue: Queue<UpdateCoinQueueItem>,
    @InjectRepository(CoinRepository) private coinRepository: CoinRepository,
  ) {}

  @OnQueueActive()
  onActive(job: Job<UpdateCoinQueueItem>) {
    this.logger.log(`Processing update with data: ${job.data}`);
  }

  @Process(UpdateCoinTaskType.UpdateCoinPrice)
  async updateCoinPrice(job: Job<UpdateCoinQueueItem>) {
    const tokenPrice = job.data.payload as ConnectorCoinPrice;
    await this.coinRepository.injectOrUpdateCoin(tokenPrice);
    return this.TASK_OK;
  }
}
