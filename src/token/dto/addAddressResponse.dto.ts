import { Exclude, Expose } from 'class-transformer';
import { Chain } from '../../coin/enum/chain';

@Exclude()
export class AddAddressResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  chain: Chain;

  @Expose()
  coinBalance: string;

  @Expose()
  lastSync: Date;
}
