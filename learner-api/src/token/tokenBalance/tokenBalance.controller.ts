import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { TokenBalanceService } from './tokenBalance.service';
import { JwtGuard } from '../../auth/jwtGuard';
import { IRequest } from '../../auth/interface/request';
import { plainToClass } from 'class-transformer';
import { TokenBalanceResponseDto } from './dto/tokenBalanceResponse.dto';
import { GetTokenBalanceQuery } from './query/getTokenBalance.query';

@Controller('token-balance')
export class TokenBalanceController {
  constructor(private tokenBalanceService: TokenBalanceService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUserAddressTokenBalance(
    @Request() req: IRequest,
    @Query() query: GetTokenBalanceQuery,
  ): Promise<TokenBalanceResponseDto[] | TokenBalanceResponseDto> {
    switch (true) {
      case !query.tokenAddress:
        // return a list of all token balances for the requested address
        return plainToClass(
          TokenBalanceResponseDto,
          await this.tokenBalanceService.getUserAddressTokenBalanceList(
            req.user.getAuthCredentialsId(),
            query.userAddress,
            query.chain,
          ),
        );
      case !!query.tokenAddress:
        // return the balance of the requested token only
        return plainToClass(
          TokenBalanceResponseDto,
          await this.tokenBalanceService.getUserAddressTokenBalance(
            req.user.getAuthCredentialsId(),
            query.userAddress,
            query.tokenAddress,
            query.chain,
          ),
        );
    }
  }
}
