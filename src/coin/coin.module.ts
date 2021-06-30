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
import { CoinHelper } from './helper/coinHelper';
import { CoinUpdateQueueTaskProcessor } from './coinUpdateQueueTask.processor';
import { BullModule } from '@nestjs/bull';
import { COIN_UPDATE_QUEUE } from '../constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinRepository, AddressRepository]),
    BullModule.registerQueueAsync({
      name: COIN_UPDATE_QUEUE,
    }),
    ConfigModule,
    ProfileModule,
  ],
  providers: [
    CoinService,
    AddressService,
    CoinHelper,
    CoinUpdateQueueTaskProcessor,
  ],
  controllers: [CoinController, AddressController],
  exports: [CoinService, AddressService],
})
export class CoinModule {}
