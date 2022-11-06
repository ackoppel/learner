import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectorTokenDetails } from '../../externalApi/model/tokenDetails.connector';
import { Connector as UniswapConnector } from '../../externalApi/uniswap/connector';
import { Connector as AlchemyConnector } from '../../externalApi/alchemy/connector';
import { Chain } from '../../coin/enum/chain';
import { ConnectorTokenBalance } from '../../externalApi/model/tokenBalance.connector';
import { IMarketMakerConnector } from '../../externalApi/interface/marketMakerConnector.interface';
import { ITokenLogoConnector } from '../../externalApi/interface/tokenLogoConnector.interface';
import { ConnectorTokenLogo } from '../../externalApi/model/tokenLogo.connector';
import { UniswapTokenDetailsHelper } from '../../externalApi/uniswap/helper/tokenDetails.helper';
import { AlchemyTokenLogoHelper } from '../../externalApi/alchemy/helper/tokenLogo.helper';
import { ConnectorTokenPrice } from '../../externalApi/model/tokenPrice.connector';
import { ITokenBalanceConnector } from '../../externalApi/interface/tokenBalanceConnector.interface';

@Injectable()
export class TokenHelper {
  constructor(private configService: ConfigService) {}

  public async fetchExternalTokenPrice(
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenPrice> {
    const apiConnector = this.getMarketConnector(chain);
    const tokenPrice = await apiConnector.fetchTokenPriceInCoin(tokenAddress);
    return apiConnector.convertTokenPrice(tokenPrice);
  }

  public async fetchExternalTokenDetails(
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenDetails> {
    const tokenModel = await this.getExternalTokenDetails(tokenAddress, chain);
    const logoModel = await this.getExternalTokenLogo(tokenAddress, chain);
    tokenModel.logoUrl = logoModel.logoUrl;
    return tokenModel;
  }

  public async fetchExternalTokenBalance(
    userAddress: string,
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenBalance> {
    const apiConnector = this.getDetailsConnector(
      chain,
      userAddress,
    ) as ITokenBalanceConnector;
    const tokenBalanceData = await apiConnector.fetchTokenBalance(tokenAddress);
    return apiConnector.convertTokenBalance(tokenBalanceData);
  }

  private async getExternalTokenDetails(
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenDetails> {
    switch (chain) {
      case Chain.ETH:
        return UniswapTokenDetailsHelper.fetchTokenDetails(
          tokenAddress,
          this.getMarketConnector(chain),
        );
    }
  }

  private async getExternalTokenLogo(
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenLogo> {
    switch (chain) {
      case Chain.ETH:
        return AlchemyTokenLogoHelper.fetchTokenLogo(
          tokenAddress,
          this.getDetailsConnector(chain) as ITokenLogoConnector,
        );
    }
  }

  // create connector here in case api key is needed from configService
  private getDetailsConnector(
    chain: Chain,
    userAddress?: string,
  ): ITokenBalanceConnector | ITokenLogoConnector {
    switch (chain) {
      case Chain.ETH:
        return new AlchemyConnector(
          this.configService.get<string>('alchemy.key'),
          userAddress || '',
        );
      default:
        throw new InternalServerErrorException(
          `${chain} chain not implemented`,
        );
    }
  }

  // create connector here in case apiKey is needed from configService
  private getMarketConnector(chain: Chain): IMarketMakerConnector {
    switch (chain) {
      case Chain.ETH:
        return new UniswapConnector();
      default:
        throw new InternalServerErrorException(
          `Chain ${chain} not implemented`,
        );
    }
  }
}
