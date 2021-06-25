import { Exclude, Expose, Transform } from 'class-transformer';
import { GenderType } from '../enum/gender';

@Exclude()
export class ProfileResponseDto {
  @Expose()
  @Transform(({ value, key, obj, type }) => obj.authCredentials.id)
  naturalId: string;

  @Expose()
  @Transform(({ value, key, obj, type }) => obj.authCredentials.username)
  username: string;

  @Expose()
  @Transform(({ value, key, obj, type }) => obj.displayName)
  displayName: string;

  @Expose()
  @Transform(({ value, key, obj, type }) => obj.gender)
  gender: GenderType;

  @Expose()
  @Transform(({ value, key, obj, type }) => obj.description)
  description: string;
}
