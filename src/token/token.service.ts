import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenRepository } from './entity/token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from './dto/createToken.dto';
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { Connector as AlchemyConnector } from '../externalApi/alchemy/connector';
import { ConnectorTokenDetails } from '../externalApi/model/tokenDetails.connector';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private configService: ConfigService,
  ) {}

  async createUniswapToken(createTokenDto: CreateTokenDto) {
    const { tokenAddress } = createTokenDto;
    const token = await this.getUniswapTokenDetails(tokenAddress);
    return this.tokenRepository.createToken(token);
  }

  private async getUniswapTokenDetails(
    tokenAddress: string,
  ): ConnectorTokenDetails {
    const uniswapConnector = new UniswapConnector();
    const tokenData = await uniswapConnector.fetchTokenDetails(tokenAddress);
    if (!tokenData.token) {
      throw new BadRequestException(
        'Please check the provided contract address!',
      );
    }
    const tokenModel = uniswapConnector.convertTokenDetails(tokenData);

    const alchemyConnector = new AlchemyConnector(
      this.configService.get<string>('alchemy.key'),
      '',
    );
    const logoData = await alchemyConnector.fetchTokenLogo(tokenAddress);
    if ('error' in logoData) {
      return tokenModel;
    }
  }
}
