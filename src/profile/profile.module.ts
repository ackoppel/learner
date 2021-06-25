import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './enitity/profile/profile.repository';
import { AuthModule } from '../auth/auth.module';
import { AddressRepository } from './enitity/address/address.repository';
import { TokenBalanceRepository } from './enitity/tokenBalance/tokenBalance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileRepository,
      AddressRepository,
      TokenBalanceRepository,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
