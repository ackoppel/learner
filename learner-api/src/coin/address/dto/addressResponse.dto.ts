import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TokenBalanceResponseDto } from '../../../token/tokenBalance/dto/tokenBalanceResponse.dto';
import { BalanceHelper } from '../../../helper/balanceHelper/balance.helper';

@Exclude()
export class AddressResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  @Transform(({ obj }) =>
    BalanceHelper.balanceWitDecimals(obj.coinBalance, obj.coin.decimals),
  )
  coinBalance: number;

  @Expose()
  @Transform(({ obj }) => obj.coin.name)
  coinName: string;

  @Expose()
  @Transform(({ obj }) => parseFloat(obj.coin.priceUsd))
  coinPriceUsd: string;

  @Expose()
  @Transform(({ obj }) => obj.coin.lastSync)
  coinPriceLastSync: Date;

  @Expose()
  @Transform(({ obj }): number => {
    switch (true) {
      // added token balances
      case !!obj.tokenBalances.length:
        return BalanceHelper.totalBalanceUsd(obj);
      // no tokens added
      default:
        return BalanceHelper.ethBalanceUsd(obj);
    }
  })
  totalBalanceUsd: number;

  @Expose()
  @Type(() => TokenBalanceResponseDto)
  tokenBalances: TokenBalanceResponseDto[];
}
