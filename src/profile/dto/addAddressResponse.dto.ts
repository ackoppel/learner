import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class AddAddressResponseDto {
  @Expose()
  id: string;

  @Expose()
  contractAddress: string;

  @Expose()
  @Transform(({ obj }) => obj.coin.name)
  coin: string;

  @Expose()
  coinBalance: string;

  @Expose()
  lastSync: Date;
}
