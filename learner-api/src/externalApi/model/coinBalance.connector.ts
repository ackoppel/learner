import { IsEnum, IsString } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class ConnectorCoinBalance {
  @IsString()
  contractAddress: string;

  @IsString()
  coinBalance: string;

  @IsEnum(Chain)
  chain: Chain;
}
