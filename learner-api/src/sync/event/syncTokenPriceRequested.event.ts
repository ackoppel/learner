import { Token } from '../../token/entity/token.entity';

export class SyncTokenPriceRequestedEvent {
  constructor(public readonly token: Token) {}
}
