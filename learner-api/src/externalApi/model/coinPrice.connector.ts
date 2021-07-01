import { Chain } from '../../coin/enum/chain';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ConnectorCoinPrice {
  @IsEnum(Chain)
  chain: Chain;

  @IsString()
  priceUsd: string;

  @IsNumber()
  decimals: number;
}
