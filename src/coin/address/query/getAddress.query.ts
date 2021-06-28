import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Chain } from '../../enum/chain';

export class GetAddressQuery {
  @IsString()
  @IsOptional()
  userAddress: string;

  @IsEnum(Chain)
  @IsOptional()
  chain: Chain;
}
