import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { TokenBalanceService } from './tokenBalance.service';
import { JwtGuard } from '../../auth/jwtGuard';
import { IRequest } from '../../auth/interface/request';
import { plainToClass } from 'class-transformer';
import { TokenBalanceResponseDto } from './dto/tokenBalanceResponse.dto';
import { AddressChainParams } from '../../coin/dto/addressChain.params';

@Controller('token-balance')
export class TokenBalanceController {
  constructor(private tokenBalanceService: TokenBalanceService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUserAddressTokenBalance(
    @Request() req: IRequest,
    @Query() query: AddressChainParams,
  ): Promise<TokenBalanceResponseDto[] | TokenBalanceResponseDto> {
    // return a list of all token balances for the requested address
    if (!query.tokenAddress) {
      return plainToClass(
        TokenBalanceResponseDto,
        await this.tokenBalanceService.getUserAddressTokenBalanceList(
          req.user.getAuthCredentialsId(),
          query.userAddress,
          query.chain,
        ),
      );
    }
    // return the balance of requested token only
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
