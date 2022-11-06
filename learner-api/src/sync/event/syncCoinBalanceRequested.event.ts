import { Address } from '../../coin/address/entity/address.entity';

export class SyncCoinBalanceRequestedEvent {
  constructor(public address: Address) {}
}
