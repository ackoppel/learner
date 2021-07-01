import { Coin } from '../../coin/entity/coin.entity';

export class SyncCoinPriceRequestedEvent {
  constructor(public readonly coin: Coin) {}
}
