import { Chain } from '../../../coin/enum/chain';
import { IsEnum, IsString } from 'class-validator';

export class DeleteTokenBalanceQuery {
  @IsString()
  tokenAddress: string;

  @IsString()
  userAddress: string;

  @IsEnum(Chain)
  chain: Chain;
}
