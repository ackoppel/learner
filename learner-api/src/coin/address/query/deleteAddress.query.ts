import { Chain } from '../../enum/chain';
import { IsEnum, IsString } from 'class-validator';

export class DeleteAddressQuery {
  @IsString()
  contract: string;

  @IsEnum(Chain)
  chain: Chain;
}
