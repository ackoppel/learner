import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Chain } from '../enum/chain';

export class AddressChainParams {
  @IsString()
  userAddress: string;

  @IsEnum(Chain)
  chain: Chain;

  @IsOptional()
  @IsString()
  tokenAddress: string;
}
