import { ConnectorTokenPrice } from '../externalApi/model/tokenPrice.connector';
import { Coin } from '../coin/entity/coin.entity';
import { ConnectorTokenBalance } from '../externalApi/model/tokenBalance.connector';

export enum UpdateTokenTaskType {
  UpdateTokenPrice = 'update.token.price',
  UpdateTokenBalance = 'update.token.balance',
}

export type UpdateTokenPayload = ConnectorTokenPrice | ConnectorTokenBalance;

export interface UpdateTokenBalancePayload {}

export interface UpdateTokenQueueItem {
  payload: UpdateTokenPayload;
  coin: Coin;
}
