import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class GetTokenQuery {
  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(Chain)
  @IsOptional()
  chain: Chain;
}
