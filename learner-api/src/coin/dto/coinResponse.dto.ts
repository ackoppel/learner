import { Exclude, Expose } from 'class-transformer';
import { Chain } from '../enum/chain';

@Exclude()
export class CoinResponseDto {
  @Expose()
  name: Chain;

  @Expose()
  priceUsd: string;

  @Expose()
  decimals: number;

  @Expose()
  lastSync: Date;
}
