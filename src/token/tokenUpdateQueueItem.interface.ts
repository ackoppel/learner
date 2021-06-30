import { ConnectorTokenPrice } from '../externalApi/model/tokenPrice.connector';
import { Coin } from '../coin/entity/coin.entity';

export enum UpdateTokenTaskType {
  UpdateTokenPrice = 'update.token.price',
}

export type UpdateTokenPayload = ConnectorTokenPrice;

export interface UpdateTokenQueueItem {
  payload: UpdateTokenPayload;
  coin: Coin;
}
