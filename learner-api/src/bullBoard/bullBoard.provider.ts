import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import {
  COIN_UPDATE_QUEUE,
  FETCH_QUEUE,
  SYNC_QUEUE,
  TOKEN_UPDATE_QUEUE,
} from '../constants/constants';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

@Injectable()
export class BullBoardProvider {
  public router;

  constructor(
    @InjectQueue(SYNC_QUEUE) private syncQueue: Queue,
    @InjectQueue(FETCH_QUEUE) private fetchQueue: Queue,
    @InjectQueue(TOKEN_UPDATE_QUEUE) private tokenImportQueue: Queue,
    @InjectQueue(COIN_UPDATE_QUEUE) private coinImportQueue: Queue,
  ) {
    const { router, setQueues } = createBullBoard([]);
    setQueues([
      new BullAdapter(syncQueue),
      new BullAdapter(fetchQueue),
      new BullAdapter(tokenImportQueue),
      new BullAdapter(coinImportQueue),
    ]);
    this.router = router;
  }
}
