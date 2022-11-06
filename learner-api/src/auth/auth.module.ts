import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCredentialsRepository } from './auth-credentials.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expires'),
        },
      }),
    }),
    TypeOrmModule.forFeature([AuthCredentialsRepository]),
    forwardRef(() => ProfileModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
    TypeOrmModule.forFeature([AuthCredentialsRepository]),
    AuthService,
  ],
})
export class AuthModule {}
