import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TokenBalanceResponseDto } from '../../../token/tokenBalance/dto/tokenBalanceResponse.dto';
import { TokenHelper } from '../../../helper/tokenHelper/tokenHelper';
import { TokenBalanceHelper } from '../helper/tokenBalance.helper';

@Exclude()
export class GetAddressResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  @Transform(({ obj }) =>
    TokenHelper.convertBalance(obj.coinBalance, obj.coin.decimals),
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
      // todo :: take coin balance into account
      // added token balances
      case !!obj.tokenBalances.length:
        return TokenBalanceHelper.totalBalance(obj.tokenBalances);
      // no tokens added
      default:
        return 0;
      // console.log('BALANCE:: ', parseFloat(obj.coinBalance));
      // console.log('price:: ', parseFloat(obj.coin.priceUsd));
      // return TokenBalanceHelper.etherBalanceToUsd(
      //   obj.coinBalance,
      //   obj.priceUsd,
      //   obj.coin.decimals,
      // );
    }
  })
  totalBalanceUsd: number;

  @Expose()
  @Type(() => TokenBalanceResponseDto)
  tokenBalances: TokenBalanceResponseDto[];
}
