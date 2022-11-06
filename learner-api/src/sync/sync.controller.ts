import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { SYNC_QUEUE } from '../constants/constants';
import { Queue } from 'bull';
import { SyncTaskType } from './interface/syncQueueItem.interface';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue,
    private syncService: SyncService,
  ) {}

  @Get('test')
  async testSync() {
    await this.syncQueue.add(SyncTaskType.SyncPrices);
    // await this.syncService.startPriceSync();
  }
}
