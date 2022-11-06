import { IsEnum, IsString } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class ConnectorTokenPrice {
  @IsString()
  address: string;

  @IsString()
  priceInCoin: string;

  @IsEnum(Chain)
  chain: Chain;
}
