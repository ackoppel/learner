import { GenderType } from '../enum/gender';
import { IsEnum, IsString, Length } from 'class-validator';

export class UpdateProfileRequestDto {
  @IsString()
  @Length(1, 20)
  displayName: string;

  @IsString()
  @Length(0, 2000)
  description: string;

  @IsEnum(GenderType)
  gender: GenderType;
}
