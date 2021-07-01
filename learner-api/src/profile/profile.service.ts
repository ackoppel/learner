import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './enitity/profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileRequestDto } from './dto/updateProfileRequest.dto';
import { Profile } from './enitity/profile.entity';
import { AuthCredentialsRepository } from '../auth/auth-credentials.repository';
import { AuthService } from '../auth/auth.service';
import { TokenProfileResponseDto } from '../auth/dto/tokenProfileResponse.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    @InjectRepository(AuthCredentialsRepository)
    private authCredentialRepository: AuthCredentialsRepository,
    private authService: AuthService,
  ) {}

  async getProfileWithAccessToken(
    authCredentialsId: string,
  ): Promise<TokenProfileResponseDto> {
    return this.authService.prepareTokenPayload(
      await this.getProfile(authCredentialsId),
    );
  }

  async getProfile(authCredentialsId: string): Promise<Profile> {
    return this.profileRepository.findOne({
      authCredentials: await this.authCredentialRepository.findOne({
        id: authCredentialsId,
      }),
    });
  }

  async updateProfile(
    updateProfileRequestDto: UpdateProfileRequestDto,
    authCredentialsId: string,
  ): Promise<Profile> {
    return this.profileRepository.updateProfile(
      updateProfileRequestDto,
      await this.getProfile(authCredentialsId),
    );
  }
}
