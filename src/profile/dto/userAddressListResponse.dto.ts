import { Exclude, Expose, Transform } from 'class-transformer';
import { Chain } from '../../coin/enum/chain';

@Exclude()
export class UserAddressListResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  chain: Chain;

  @Expose()
  @Transform(({ obj }) => obj.coinBalance)
  coinBalance: number;
}
