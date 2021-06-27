import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TokenBalanceResponseDto } from '../../tokenBalance/dto/tokenBalanceResponse.dto';
import { TokenHelper } from '../../../helper/tokenHelper/tokenHelper';

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
  @Type(() => TokenBalanceResponseDto)
  tokenBalances: TokenBalanceResponseDto[];
}
