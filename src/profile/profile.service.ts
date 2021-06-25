import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './enitity/profile/profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from '../auth/entity/auth-credentials.entity';
import { UpdateProfileRequestDto } from './dto/updateProfileRequest.dto';
import { Profile } from './enitity/profile/profile.entity';
import { AuthCredentialsRepository } from '../auth/auth-credentials.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    @InjectRepository(AuthCredentialsRepository)
    private authCredentialRepository: AuthCredentialsRepository,
  ) {}

  async createProfile(authCredentials: AuthCredentials): Promise<void> {
    return this.profileRepository.createProfile(authCredentials);
  }

  async getProfile(authCredentialsId: string): Promise<Profile> {
    const authCredentials = await this.authCredentialRepository.findOne({
      id: authCredentialsId,
    });
    return this.profileRepository.findOne({ authCredentials });
  }

  async updateProfile(
    updateProfileRequestDto: UpdateProfileRequestDto,
    authCredentialsId: string,
  ): Promise<Profile> {
    const profile = await this.getProfile(authCredentialsId);
    return this.profileRepository.updateProfile(
      updateProfileRequestDto,
      profile,
    );
  }
}
