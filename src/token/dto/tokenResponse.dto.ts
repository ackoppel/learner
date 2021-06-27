import { Exclude, Expose, Transform } from 'class-transformer';
import { TokenHelper } from '../../helper/tokenHelper/tokenHelper';

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
    TokenHelper.convertPrice(obj.priceInCoin, obj.coin.priceUsd),
  )
  priceUsd: string;

  @Expose()
  lastSync: Date;
}
