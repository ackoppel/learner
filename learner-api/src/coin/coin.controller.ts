import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CoinService } from './coin.service';
import { JwtGuard } from '../auth/jwtGuard';
import { GetCoinQuery } from './query/getCoin.query';
import { plainToClass } from 'class-transformer';
import { CoinResponseDto } from './dto/coinResponse.dto';

@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getCoinOrCoins(
    @Query() query: GetCoinQuery,
  ): Promise<CoinResponseDto | CoinResponseDto[]> {
    switch (true) {
      // query provided
      case !!query.name:
        return plainToClass(
          CoinResponseDto,
          await this.coinService.getCoin(query.name),
        );
      // no query
      default:
        return plainToClass(CoinResponseDto, await this.coinService.getCoins());
    }
  }
}
