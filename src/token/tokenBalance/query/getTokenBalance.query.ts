import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Chain } from '../../../coin/enum/chain';

export class GetTokenBalanceQuery {
  @IsString()
  userAddress: string;

  @IsEnum(Chain)
  chain: Chain;

  @IsOptional()
  @IsString()
  tokenAddress: string;
}
