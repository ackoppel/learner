import { ConnectorCoinPrice } from '../../externalApi/model/coinPrice.connector';
import { Address } from '../address/entity/address.entity';
import { ConnectorCoinBalance } from '../../externalApi/model/coinBalance.connector';

export enum UpdateCoinTaskType {
  UpdateCoinPrice = 'update.coin.price',
  UpdateCoinBalance = 'update.coin.balance',
}

export type UpdateCoinPayload = ConnectorCoinPrice | UpdateCoinBalancePayload;

export interface UpdateCoinBalancePayload {
  address: Address;
  update: ConnectorCoinBalance;
}

export interface UpdateCoinQueueItem {
  payload: UpdateCoinPayload;
}
