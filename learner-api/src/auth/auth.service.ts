import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsRepository } from './auth-credentials.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthCredentialsRepository)
    private authCredentialsRepository: AuthCredentialsRepository,
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.authCredentialsRepository.createUser(
      authCredentialsDto,
    );
    await this.profileService.createProfile(user);
  }

  async login(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentialsDto;
    const user = await this.authCredentialsRepository.findOne({
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }
}
