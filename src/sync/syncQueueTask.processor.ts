import { InjectQueue, OnQueueError, Process, Processor } from '@nestjs/bull';
import { SYNC_QUEUE } from '../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ConfigService } from '@nestjs/config';
import { SyncTaskType } from './interface/syncQueueItem.interface';
import { Queue } from 'bull';

@Processor(SYNC_QUEUE)
export class SyncQueueTaskProcessor implements OnModuleInit {
  // TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue,
    private configService: ConfigService,
    private syncService: SyncService,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.syncQueue.pause();
      this.logger.warn('Pausing sync queue');
    } else {
      await this.syncQueue.resume();
      this.logger.warn('Resuming sync queue');
    }
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(SyncTaskType.SyncPrices)
  async startPriceSync() {
    await this.syncService.startPriceSync();
  }

  @Process(SyncTaskType.SyncBalances)
  async startBalanceSync() {
    await this.syncService.startBalanceSync();
  }
}
