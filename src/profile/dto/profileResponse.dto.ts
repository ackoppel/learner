import { Exclude, Expose, Transform } from 'class-transformer';
import { GenderType } from '../enum/gender';

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
}
