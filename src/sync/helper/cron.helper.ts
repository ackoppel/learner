import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { SYNC_QUEUE } from '../../constants/constants';
import { Queue } from 'bull';
import {
  SyncQueueItem,
  SyncTaskType,
} from '../interface/syncQueueItem.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronHelper {
  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue<SyncQueueItem>,
    private configService: ConfigService,
  ) {}

  async startSync() {
    await this.syncQueue.add(SyncTaskType.SyncPrices, undefined, {
      removeOnComplete: true,
      repeat: {
        cron: this.configService.get<string>('cron.price'),
      },
    });
  }

  async pauseSync() {
    await this.syncQueue.removeRepeatable(SyncTaskType.SyncPrices, {
      cron: this.configService.get<string>('cron.price'),
    });
  }
}
