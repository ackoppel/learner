import {
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { COIN_UPDATE_QUEUE } from '../../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinRepository } from '../entity/coin.repository';
import {
  UpdateCoinBalancePayload,
  UpdateCoinQueueItem,
  UpdateCoinTaskType,
} from './coinUpdateQueueItem.interface';
import { ConnectorCoinPrice } from '../../externalApi/model/coinPrice.connector';
import { ConfigService } from '@nestjs/config';
import { AddressRepository } from '../address/entity/address.repository';

@Processor(COIN_UPDATE_QUEUE)
export class CoinUpdateQueueTaskProcessor implements OnModuleInit {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(COIN_UPDATE_QUEUE)
    private coinUpdateQueue: Queue<UpdateCoinQueueItem>,
    @InjectRepository(CoinRepository) private coinRepository: CoinRepository,
    private configService: ConfigService,
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.coinUpdateQueue.pause();
      this.logger.warn('Pausing coin update queue');
    } else {
      await this.coinUpdateQueue.resume();
      this.logger.warn('Resuming coin update queue');
    }
  }

  @OnQueueActive()
  onActive(job: Job<UpdateCoinQueueItem>) {
    this.logger.log(`Processing update with data: ${JSON.stringify(job.data)}`);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(UpdateCoinTaskType.UpdateCoinPrice)
  async updateCoinPrice(job: Job<UpdateCoinQueueItem>) {
    const coinPrice = job.data.payload as ConnectorCoinPrice;
    await this.coinRepository.injectOrUpdateCoin(coinPrice);
    return this.TASK_OK;
  }

  @Process(UpdateCoinTaskType.UpdateCoinBalance)
  async updateCoinBalance(job: Job<UpdateCoinQueueItem>) {
    const payload = job.data.payload as UpdateCoinBalancePayload;
    await this.addressRepository.insertOrUpdateAddress(
      payload.update,
      payload.address.profile,
      payload.address.coin,
    );
    return this.TASK_OK;
  }
}
