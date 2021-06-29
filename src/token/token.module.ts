import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './entity/token.repository';
import { ConfigModule } from '@nestjs/config';
import { CoinModule } from '../coin/coin.module';
import { TokenBalanceRepository } from './tokenBalance/entity/tokenBalance.repository';
import { TokenBalanceService } from './tokenBalance/tokenBalance.service';
import { TokenBalanceController } from './tokenBalance/tokenBalance.controller';
import { TokenHelper } from './helper/tokenHelper';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TokenRepository, TokenBalanceRepository]),
    CoinModule,
  ],
  providers: [TokenService, TokenBalanceService, TokenHelper],
  controllers: [TokenController, TokenBalanceController],
})
export class TokenModule {}
