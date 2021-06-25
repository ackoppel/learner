import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { AuthCredentials } from '../../../auth/entity/auth-credentials.entity';
import { UpdateProfileRequestDto } from '../../dto/updateProfileRequest.dto';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(authCredentials: AuthCredentials) {
    const profile = this.create({
      displayName: authCredentials.username,
      authCredentials,
    });
    await this.save(profile);
  }

  async updateProfile(
    updateProfileRequestDto: UpdateProfileRequestDto,
    profile: Profile,
  ): Promise<Profile> {
    const mergedProfile = this.merge(profile, { ...updateProfileRequestDto });
    return this.save(mergedProfile);
  }
}
