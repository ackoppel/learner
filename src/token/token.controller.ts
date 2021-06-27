import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtGuard } from '../auth/jwtGuard';
import { CreateTokenDto } from './dto/createToken.dto';
import { IRequest } from '../auth/interface/request';
import { plainToClass } from 'class-transformer';
import { TokenResponseDto } from './dto/tokenResponse.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getTokenList(): Promise<TokenResponseDto[]> {
    return plainToClass(
      TokenResponseDto,
      await this.tokenService.getTokenList(),
    );
  }

  @Post('uniswap')
  @UseGuards(JwtGuard)
  async createUniswapToken(
    @Body() createTokenDto: CreateTokenDto,
    @Request() req: IRequest,
  ): Promise<TokenResponseDto> {
    return plainToClass(
      TokenResponseDto,
      await this.tokenService.createUniswapToken(
        createTokenDto,
        req.user.getAuthCredentialsId(),
      ),
    );
  }
}
