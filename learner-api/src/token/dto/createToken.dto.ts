import { IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  tokenAddress: string;

  @IsString()
  userAddress: string;
}
