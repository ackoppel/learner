import { IsString } from 'class-validator';

export class ConnectorTokenLogo {
  @IsString()
  address: string;

  @IsString()
  logoUrl: string;
}
