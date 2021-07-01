import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class ConnectorTokenDetails {
  @IsString()
  address: string;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  decimals: number;

  @IsString()
  priceInCoin: string;

  @IsEnum(Chain)
  chain: Chain;

  @IsString()
  @IsOptional()
  logoUrl: string;
}
