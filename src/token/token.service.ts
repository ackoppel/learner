import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenRepository } from './entity/token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from './dto/createToken.dto';
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { Connector as AlchemyConnector } from '../externalApi/alchemy/connector';
import { ConnectorTokenDetails } from '../externalApi/model/tokenDetails.connector';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from '../profile/profile.service';
import { Chain } from '../coin/enum/chain';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private profileService: ProfileService,
    private configService: ConfigService,
  ) {}

  async createUniswapToken(
    createTokenDto: CreateTokenDto,
    authCredentialsId: string,
  ): Promise<Token> {
    await this.checkAddressList(authCredentialsId, Chain.ETH);
    const { tokenAddress } = createTokenDto;
    const token = await this.getUniswapTokenDetails(tokenAddress);
    return this.tokenRepository.createToken(token);
  }

  private async getUniswapTokenDetails(
    tokenAddress: string,
  ): Promise<ConnectorTokenDetails> {
    // token details
    const uniswapConnector = new UniswapConnector();
    const tokenData = await uniswapConnector.fetchTokenDetails(tokenAddress);
    if (!tokenData.token) {
      throw new BadRequestException(
        'Please check the provided contract address!',
      );
    }
    const tokenModel = uniswapConnector.convertTokenDetails(tokenData);

    // token logo
    const alchemyConnector = new AlchemyConnector(
      this.configService.get<string>('alchemy.key'),
    );
    const logoData = await alchemyConnector.fetchTokenLogo(tokenAddress);
    if ('error' in logoData) {
      return tokenModel;
    }
    const logoModel = alchemyConnector.convertTokenLogo(logoData, tokenAddress);
    tokenModel.logoUrl = logoModel.logoUrl;
    return tokenModel;
  }

  private async checkAddressList(authCredentialsId: string, chain: Chain) {
    const hasAddresses = await this.profileService.hasAddresses(
      authCredentialsId,
      chain,
    );
    if (!hasAddresses) {
      throw new BadRequestException(
        'You must add atleast one ethereum address to create tokens',
      );
    }
    return;
  }
}
