import { Exclude, Expose, Transform } from 'class-transformer';
import { TokenHelper } from '../../../helper/tokenHelper/tokenHelper';

@Exclude()
export class TokenBalanceResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.id)
  balanceId: string;

  @Expose()
  @Transform(({ obj }) => obj.token.address)
  address: string;

  @Expose()
  @Transform(({ obj }) => obj.token.name)
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.token.symbol)
  symbol: string;

  @Expose()
  @Transform(({ obj }) => obj.token.priceInCoin)
  priceInCoin: string;

  @Expose()
  @Transform(({ obj }) =>
    TokenHelper.convertPrice(obj.token.priceInCoin, obj.token.coin.priceUsd),
  )
  priceUsd: string;

  @Expose()
  @Transform(({ obj }) => obj.token.lastSync)
  lastPriceSync: Date;

  @Expose()
  @Transform(({ obj }) =>
    TokenHelper.convertBalance(obj.balance, obj.token.decimals),
  )
  balanceConverted: number;

  @Expose()
  @Transform(({ obj }) =>
    TokenHelper.convertBalanceToValueUsd(
      obj.balance,
      obj.token.decimals,
      obj.token.priceInCoin,
      obj.token.coin.priceUsd,
    ),
  )
  balanceValueUsd: number;

  @Expose()
  @Transform(({ obj }) => obj.lastSync)
  lastBalanceSync: Date;

  @Expose()
  @Transform(({ obj }) => obj.token.logoUrl)
  logoUrl: string;
}
