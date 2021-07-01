import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { GenderType } from '../enum/gender';
import { AddressResponseDto } from '../../coin/address/dto/addressResponse.dto';

@Exclude()
export class ProfileResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.authCredentials.id)
  naturalId: string;

  @Expose()
  @Transform(({ obj }) => obj.authCredentials.username)
  username: string;

  @Expose()
  @Transform(({ obj }) => obj.displayName)
  displayName: string;

  @Expose()
  @Transform(({ obj }) => obj.gender)
  gender: GenderType;

  @Expose()
  @Transform(({ obj }) => obj.description)
  description: string;

  @Expose()
  @Type(() => AddressResponseDto)
  addresses: AddressResponseDto[];
}
