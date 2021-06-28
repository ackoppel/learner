import { IsEnum, IsString } from 'class-validator';
import { Chain } from '../../enum/chain';

export class GetAddressParams {
  @IsString()
  userAddress: string;

  @IsEnum(Chain)
  chain: Chain;
}
