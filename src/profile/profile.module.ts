import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './enitity/profile.repository';
import { AuthModule } from '../auth/auth.module';
import { CoinModule } from '../coin/coin.module';
import { TokenBalanceRepository } from './tokenBalance/entity/tokenBalance.repository';
import { TokenBalanceService } from './tokenBalance/tokenBalance.service';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository, TokenBalanceRepository]),
    forwardRef(() => AuthModule),
    CoinModule,
    AddressModule,
    ConfigModule,
  ],
  providers: [ProfileService, TokenBalanceService],
  controllers: [ProfileController],
  exports: [ProfileService, TokenBalanceService],
})
export class ProfileModule {}
