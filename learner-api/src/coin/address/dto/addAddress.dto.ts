import { IsEnum, IsString } from 'class-validator';
import { Chain } from '../../enum/chain';

export class AddAddressDto {
  @IsString()
  address: string;

  @IsEnum(Chain)
  chain: Chain;
}
