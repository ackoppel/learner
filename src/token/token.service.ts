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
import { Address } from '../profile/enitity/address/address.entity';
import { TokenBalanceRepository } from '../profile/enitity/tokenBalance/tokenBalance.repository';
import { CoinService } from '../coin/coin.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
    private profileService: ProfileService,
    private coinService: CoinService,
    private configService: ConfigService,
  ) {}

  async createUniswapToken(
    createTokenDto: CreateTokenDto,
    authCredentialsId: string,
  ): Promise<Token> {
    const address = await this.checkAddress(
      authCredentialsId,
      createTokenDto.userAddress,
      Chain.ETH,
    );
    const token = await this.tokenRepository.createOrUpdateToken(
      await this.getUniswapTokenDetails(createTokenDto.tokenAddress),
      await this.coinService.getCoin(Chain.ETH),
    );
    await this.insertUniswapTokenBalance(address, token);
    return token;
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

  async insertUniswapTokenBalance(
    address: Address,
    token: Token,
  ): Promise<void> {
    const apiConnector = new AlchemyConnector(
      this.configService.get<string>('alchemy.key'),
      address.contractAddress,
    );
    const tokenBalanceData = await apiConnector.fetchTokenBalance(
      token.address,
    );
    await this.tokenBalanceRepository.createOrUpdateBalance(
      address,
      token,
      apiConnector.convertTokenBalance(tokenBalanceData),
    );
  }

  private async checkAddress(
    authCredentialsId: string,
    userAddress: string,
    chain: Chain,
  ): Promise<Address> {
    const address = await this.profileService.getAddress(
      authCredentialsId,
      userAddress,
      chain,
    );
    if (!address) {
      throw new BadRequestException(
        `You must add ${chain} address "${userAddress}" to create tokens`,
      );
    }
    return address;
  }
}
