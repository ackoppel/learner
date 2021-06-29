import { IsEnum, IsOptional } from 'class-validator';
import { Chain } from '../enum/chain';

export class GetCoinQuery {
  @IsEnum(Chain)
  @IsOptional()
  name: Chain;
}
