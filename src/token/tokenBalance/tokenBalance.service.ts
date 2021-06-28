import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenBalanceRepository } from './entity/tokenBalance.repository';
import { ConfigService } from '@nestjs/config';
import { Address } from '../../coin/address/entity/address.entity';
import { Token } from '../entity/token.entity';
import { Connector as AlchemyConnector } from '../../externalApi/alchemy/connector';
import { ConnectorTokenBalance } from '../../externalApi/model/tokenBalance.connector';
import { Chain } from '../../coin/enum/chain';
import { AddressService } from '../../coin/address/address.service';
import { TokenBalance } from './entity/tokenBalance.entity';
import { CoinService } from '../../coin/coin.service';
import { TokenRepository } from '../entity/token.repository';

@Injectable()
export class TokenBalanceService {
  constructor(
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private coinService: CoinService,
    private addressService: AddressService,
    private configService: ConfigService,
  ) {}

  async getUserAddressTokenBalanceList(
    authCredentialsId: string,
    userAddress: string,
    chain: Chain,
  ): Promise<TokenBalance[]> {
    return this.tokenBalanceRepository.find({
      address: await this.addressService.checkAddress(
        authCredentialsId,
        userAddress,
        chain,
      ),
    });
  }

  async getUserAddressTokenBalance(
    authCredentialsId: string,
    userAddress: string,
    tokenAddress: string,
    chain: Chain,
  ): Promise<TokenBalance> {
    return this.tokenBalanceRepository.findOne({
      address: await this.addressService.checkAddress(
        authCredentialsId,
        userAddress,
        chain,
      ),
      token: await this.tokenRepository.checkToken(
        tokenAddress,
        await this.coinService.getCoin(chain),
      ),
    });
  }

  async fetchAndInsertTokenBalance(
    address: Address,
    token: Token,
  ): Promise<TokenBalance> {
    return this.tokenBalanceRepository.createOrUpdateBalance(
      address,
      token,
      await this.fetchExternalTokenBalance(
        address.contractAddress,
        token.address,
        token.coin.name,
      ),
    );
  }

  private async fetchExternalTokenBalance(
    userAddress: string,
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenBalance> {
    const apiConnector = this.createBalanceApiConnector(userAddress, chain);
    const tokenBalanceData = await apiConnector.fetchTokenBalance(tokenAddress);
    return apiConnector.convertTokenBalance(tokenBalanceData);
  }

  private createBalanceApiConnector(userAddress: string, chain: Chain) {
    switch (chain) {
      case Chain.ETH:
        return new AlchemyConnector(
          this.configService.get<string>('alchemy.key'),
          userAddress,
        );
      default:
        throw new InternalServerErrorException('Chain not implemented');
    }
  }
}
