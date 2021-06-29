import { IsEnum } from 'class-validator';
import { Chain } from '../../coin/enum/chain';

export class AddTokenParams {
  @IsEnum(Chain)
  chain: Chain;
}
