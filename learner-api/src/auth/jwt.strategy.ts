import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthCredentialsRepository } from './auth-credentials.repository';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { Identity } from './interface/request';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthCredentialsRepository)
    private readonly authCredentialsRepository: AuthCredentialsRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      ignoreExpiration: configService.get<boolean>('jwt.ignore_expiration'),
    });
  }

  async validate(payload: JwtPayload): Promise<Identity> {
    const { username } = payload;
    const user = await this.authCredentialsRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      getUsername: () => user.username,
      getAuthCredentialsId: () => user.id,
    };
  }
}
