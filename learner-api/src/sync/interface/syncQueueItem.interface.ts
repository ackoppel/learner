import { Chain } from '../../coin/enum/chain';
import { Token } from '../../token/entity/token.entity';
import { TokenBalance } from '../../token/tokenBalance/entity/tokenBalance.entity';
import { Address } from '../../coin/address/entity/address.entity';

export enum SyncTaskType {
  SyncPrices = 'sync.prices',

  SyncCoinPrice = 'sync.coin.price',
  SyncTokenPrice = 'sync.token.price',

  SyncBalances = 'sync.balances',

  SyncTokenBalance = 'sync.token.balance',
  SyncCoinBalance = 'sync.coin.balance',
}

export interface SyncCoinPricePayload {
  chain: Chain;
}

export interface SyncTokenPricePayload {
  token: Token;
}

export interface SyncTokenBalancePayload {
  tokenBalance: TokenBalance;
}

export interface SyncCoinBalancePayload {
  address: Address;
}

export type PayloadType =
  | SyncCoinPricePayload
  | SyncTokenPricePayload
  | SyncTokenBalancePayload
  | SyncCoinBalancePayload;

export interface SyncQueueItem {
  payload: PayloadType;
}
