import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRepository } from './entity/coin.repository';
import { ConfigModule } from '@nestjs/config';
import { AddressRepository } from './address/entity/address.repository';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinRepository, AddressRepository]),
    ConfigModule,
    ProfileModule,
  ],
  providers: [CoinService, AddressService],
  controllers: [CoinController, AddressController],
  exports: [CoinService, AddressService],
})
export class CoinModule {}
