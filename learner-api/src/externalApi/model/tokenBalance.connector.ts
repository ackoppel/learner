import { IsString } from 'class-validator';

export class ConnectorTokenBalance {
  @IsString()
  userAddress: string;

  @IsString()
  tokenAddress: string;

  @IsString()
  balance: string;
}
