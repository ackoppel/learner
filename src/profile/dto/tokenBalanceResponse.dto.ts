import { Exclude, Expose, Transform } from 'class-transformer';

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
  @Transform(({ obj }) => obj.token.lastSync)
  lastPriceSync: Date;

  @Expose()
  @Transform(({ obj }) => parseInt(obj.balance) / 10 ** obj.token.decimals)
  balance: number;

  @Expose()
  @Transform(({ obj }) => obj.lastSync)
  lastBalanceSync: Date;

  @Expose()
  @Transform(({ obj }) => obj.token.logoUrl)
  logoUrl: string;
}
