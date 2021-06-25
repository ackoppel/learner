import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRepository } from './entity/coin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoinRepository])],
  providers: [CoinService],
  controllers: [CoinController],
})
export class CoinModule {}
