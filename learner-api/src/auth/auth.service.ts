import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsRepository } from './auth-credentials.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { ProfileRepository } from '../profile/enitity/profile.repository';
import { plainToClass } from 'class-transformer';
import { TokenProfileResponseDto } from './dto/tokenProfileResponse.dto';
import { Profile } from '../profile/enitity/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthCredentialsRepository)
    private authCredentialsRepository: AuthCredentialsRepository,
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.authCredentialsRepository.createUser(
      authCredentialsDto,
    );
    await this.profileRepository.createProfile(user);
  }

  async login(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<TokenProfileResponseDto> {
    const { username, password } = loginCredentialsDto;
    const user = await this.authCredentialsRepository.findOne({
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.prepareTokenPayload(
        await this.profileRepository.findOne({
          authCredentials: user,
        }),
      );
    }
    throw new UnauthorizedException('Please check your login credentials');
  }

  async prepareTokenPayload(
    profile: Profile,
  ): Promise<TokenProfileResponseDto> {
    const payload: JwtPayload = { username: profile.authCredentials.username };
    return plainToClass(TokenProfileResponseDto, {
      accessToken: await this.jwtService.sign(payload),
      profile,
    });
  }
}
