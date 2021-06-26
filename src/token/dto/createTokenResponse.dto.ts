import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CreateTokenResponseDto {
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
  @Transform(({ obj }) => obj.coin.name)
  coin: string;

  @Expose()
  priceInCoin: string;

  @Expose()
  logoUrl: string;
}
