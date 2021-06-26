import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TokenBalanceResponseDto } from './tokenBalanceResponse.dto';

@Exclude()
export class GetAddressListResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  @Transform(({ obj }) => parseInt(obj.coinBalance) / 10 ** obj.coin.decimals)
  coinBalance: number;

  @Expose()
  @Transform(({ obj }) => obj.coin.name)
  coinName: string;

  @Expose()
  @Transform(({ obj }) => parseFloat(obj.coin.priceUsd))
  coinPriceUsd: number;

  @Expose()
  @Transform(({ obj }) => obj.coin.lastSync)
  coinPriceLastSync: Date;

  @Expose()
  @Type(() => TokenBalanceResponseDto)
  tokenBalances: TokenBalanceResponseDto[];
}
