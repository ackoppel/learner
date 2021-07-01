import { TokenBalance } from '../../token/tokenBalance/entity/tokenBalance.entity';

export class SyncTokenBalanceRequestedEvent {
  constructor(public readonly tokenBalance: TokenBalance) {}
}
