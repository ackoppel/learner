import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRepository } from './entity/coin.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([CoinRepository]), ConfigModule],
  providers: [CoinService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
