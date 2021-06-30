import { Chain } from '../../coin/enum/chain';
import { Token } from '../../token/entity/token.entity';

export enum SyncTaskType {
  SyncPrices = 'sync.prices',

  SyncCoinPrice = 'sync.coin.price',
  SyncTokenPrice = 'sync.token.price',
}

export interface SyncCoinPricePayload {
  chain: Chain;
}

export interface SyncTokenPricePayload {
  // tokenAddress: string;
  // chain: Chain;
  token: Token;
}

export type PayloadType = SyncCoinPricePayload | SyncTokenPricePayload;

export interface SyncQueueItem {
  payload: PayloadType;
}
