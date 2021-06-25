import { IsString } from 'class-validator';

export class ConnectorTokenPrice {
  @IsString()
  address: string;

  @IsString()
  priceEth: string;
}
