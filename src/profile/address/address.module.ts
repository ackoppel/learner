import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './entity/address.repository';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { ProfileModule } from '../profile.module';
import { CoinModule } from '../../coin/coin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository]),
    forwardRef(() => ProfileModule),
    CoinModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
