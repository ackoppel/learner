import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtGuard } from '../auth/jwtGuard';
import { CreateTokenDto } from './dto/createToken.dto';
import { IRequest } from '../auth/interface/request';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('uniswap')
  @UseGuards(JwtGuard)
  async createUniswapToken(
    @Body() createTokenDto: CreateTokenDto,
    @Request() req: IRequest,
  ) {
    return this.tokenService.createUniswapToken(
      createTokenDto,
      req.user.getAuthCredentialsId(),
    );
  }
}
