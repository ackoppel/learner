import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './entity/token.repository';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TokenRepository]),
    ProfileModule,
  ],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
