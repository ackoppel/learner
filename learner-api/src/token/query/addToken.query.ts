import { IsEnum } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class AddTokenQuery {
  @IsEnum(Chain)
  chain: Chain;
}
