import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenRepository } from './entity/token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from './dto/createToken.dto';
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { Connector as AlchemyConnector } from '../externalApi/alchemy/connector';
import { ConnectorTokenDetails } from '../externalApi/model/tokenDetails.connector';
import { ConfigService } from '@nestjs/config';
import { Chain } from '../coin/enum/chain';
import { Token } from './entity/token.entity';
import { CoinService } from '../coin/coin.service';
import { TokenBalanceService } from '../profile/tokenBalance/tokenBalance.service';
import { AddressService } from '../profile/address/address.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private addressService: AddressService,
    private tokenBalanceService: TokenBalanceService,
    private coinService: CoinService,
    private configService: ConfigService,
  ) {}

  async getTokenList(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async createUniswapToken(
    createTokenDto: CreateTokenDto,
    authCredentialsId: string,
  ): Promise<Token> {
    const address = await this.addressService.checkAddress(
      authCredentialsId,
      createTokenDto.userAddress,
      Chain.ETH,
    );
    const token = await this.tokenRepository.createOrUpdateToken(
      await this.fetchUniswapTokenDetails(createTokenDto.tokenAddress),
      await this.coinService.getCoin(Chain.ETH),
    );
    await this.tokenBalanceService.fetchAndInsertTokenBalance(address, token);
    return token;
  }

  private async fetchUniswapTokenDetails(
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
}
