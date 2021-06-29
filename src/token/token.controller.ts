import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtGuard } from '../auth/jwtGuard';
import { CreateTokenDto } from './dto/createToken.dto';
import { IRequest } from '../auth/interface/request';
import { plainToClass } from 'class-transformer';
import { TokenResponseDto } from './dto/tokenResponse.dto';
import { GetTokenQuery } from './query/getToken.query';
// import { MarketMaker } from './enum/marketMaker.enum';
// import { Chain } from '../coin/enum/chain';
import { AddTokenParams } from './params/addToken.params';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getTokenOrTokens(
    @Query() query: GetTokenQuery,
  ): Promise<TokenResponseDto | TokenResponseDto[]> {
    switch (true) {
      // query was provided
      case !!query.address && !!query.chain:
        return plainToClass(
          TokenResponseDto,
          await this.tokenService.getExistingToken(query.address, query.chain),
        );
      // query was not provided
      default:
        return plainToClass(
          TokenResponseDto,
          await this.tokenService.getExistingTokenList(),
        );
    }
  }

  @Post(':chain')
  @UseGuards(JwtGuard)
  async addUniswapToken(
    @Param() params: AddTokenParams,
    @Body() createTokenDto: CreateTokenDto,
    @Request() req: IRequest,
  ): Promise<TokenResponseDto> {
    return plainToClass(
      TokenResponseDto,
      await this.tokenService.addToken(
        createTokenDto,
        req.user.getAuthCredentialsId(),
        params.chain,
      ),
    );
  }
}
