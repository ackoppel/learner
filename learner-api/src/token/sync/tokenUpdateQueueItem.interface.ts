import { ConnectorTokenPrice } from '../../externalApi/model/tokenPrice.connector';
import { Coin } from '../../coin/entity/coin.entity';
import { ConnectorTokenBalance } from '../../externalApi/model/tokenBalance.connector';
import { TokenBalance } from '../tokenBalance/entity/tokenBalance.entity';

export enum UpdateTokenTaskType {
  UpdateTokenPrice = 'update.token.price',
  UpdateTokenBalance = 'update.token.balance',
}

export type UpdateTokenPayload =
  | UpdateTokenPricePayload
  | UpdateTokenBalancePayload;

export interface UpdateTokenPricePayload {
  tokenPrice: ConnectorTokenPrice;
  coin: Coin;
}

export interface UpdateTokenBalancePayload {
  tokenBalance: TokenBalance;
  update: ConnectorTokenBalance;
}

export interface UpdateTokenQueueItem {
  payload: UpdateTokenPayload;
}
