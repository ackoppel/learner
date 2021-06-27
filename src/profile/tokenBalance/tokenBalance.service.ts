import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenBalanceRepository } from './entity/tokenBalance.repository';
import { ConfigService } from '@nestjs/config';
import { Address } from '../address/entity/address.entity';
import { Token } from '../../token/entity/token.entity';
import { Connector as AlchemyConnector } from '../../externalApi/alchemy/connector';
import { ConnectorTokenBalance } from '../../externalApi/model/tokenBalance.connector';
import { Chain } from '../../coin/enum/chain';

@Injectable()
export class TokenBalanceService {
  constructor(
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
    private configService: ConfigService,
  ) {}

  async fetchAndInsertTokenBalance(
    address: Address,
    token: Token,
  ): Promise<void> {
    await this.tokenBalanceRepository.createOrUpdateBalance(
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
