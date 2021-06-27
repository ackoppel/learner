import { IsEnum, IsString } from 'class-validator';
import { Chain } from '../../../coin/enum/chain';

export class AddAddressDto {
  @IsString()
  address: string;

  @IsEnum(Chain)
  chain: Chain;
}
