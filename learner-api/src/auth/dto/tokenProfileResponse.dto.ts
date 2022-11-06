import { Exclude, Expose, Type } from 'class-transformer';
import { ProfileResponseDto } from '../../profile/dto/profileResponse.dto';

@Exclude()
export class TokenProfileResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto;
}
