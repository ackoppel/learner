import { ConnectorCoinPrice } from '../externalApi/model/coinPrice.connector';

export enum UpdateCoinTaskType {
  UpdateCoinPrice = 'update.coin.price',
}

export type UpdateCoinPayload = ConnectorCoinPrice;

export interface UpdateCoinQueueItem {
  payload: UpdateCoinPayload;
}
