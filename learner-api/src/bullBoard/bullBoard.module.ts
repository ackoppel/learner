import { Module } from '@nestjs/common';
import { BullBoardProvider } from './bullBoard.provider';
import { BullModule } from '@nestjs/bull';
import {
  COIN_UPDATE_QUEUE,
  FETCH_QUEUE,
  SYNC_QUEUE,
  TOKEN_UPDATE_QUEUE,
} from '../constants/constants';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: SYNC_QUEUE,
    }),
    BullModule.registerQueueAsync({
      name: FETCH_QUEUE,
    }),
    BullModule.registerQueueAsync({
      name: TOKEN_UPDATE_QUEUE,
    }),
    BullModule.registerQueueAsync({
      name: COIN_UPDATE_QUEUE,
    }),
  ],
  providers: [BullBoardProvider],
})
export class BullBoardModule {}
