import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Chain } from '../../enum/chain';

export class GetAddressQuery {
  @IsString()
  @IsOptional()
  contract: string;

  @IsEnum(Chain)
  @IsOptional()
  chain: Chain;
}
