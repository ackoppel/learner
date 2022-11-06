import { Exclude, Expose, Transform } from 'class-transformer';
import { BalanceHelper } from '../../helper/balanceHelper/balance.helper';
// import { MarketMaker } from '../enum/marketMaker.enum';

@Exclude()
export class TokenResponseDto {
  @Expose()
  id: string;

  @Expose()
  address: string;

  @Expose()
  name: string;

  @Expose()
  symbol: string;

  @Expose()
  decimals: number;

  @Expose()
  logoUrl: string;

  @Expose()
  @Transform(({ obj }) => obj.coin.name)
  coin: string;

  @Expose()
  priceInCoin: string;

  @Expose()
  @Transform(({ obj }) =>
    BalanceHelper.tokenPriceUsd(obj.priceInCoin, obj.coin.priceUsd),
  )
  priceUsd: string;

  // @Expose()
  // marketMaker: MarketMaker;

  @Expose()
  lastSync: Date;
}
