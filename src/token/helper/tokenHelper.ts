import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { MarketMaker } from '../enum/marketMaker.enum';
import { ConnectorTokenDetails } from '../../externalApi/model/tokenDetails.connector';
import { Connector as UniswapConnector } from '../../externalApi/uniswap/connector';
import { Connector as AlchemyConnector } from '../../externalApi/alchemy/connector';
import { Chain } from '../../coin/enum/chain';
import { ConnectorTokenBalance } from '../../externalApi/model/tokenBalance.connector';
import { IMarketMakerConnector } from '../../externalApi/interface/marketMakerConnector.interface';
import { IDetailsConnector } from '../../externalApi/interface/detailsConnector.interface';
import { ConnectorTokenLogo } from '../../externalApi/model/tokenLogo.connector';
import { UniswapTokenDetailsHelper } from '../../externalApi/uniswap/helper/tokenDetails.helper';
import { AlchemyTokenLogoHelper } from '../../externalApi/alchemy/helper/tokenLogo.helper';

@Injectable()
export class TokenHelper {
  constructor(private configService: ConfigService) {}

  public async fetchExternalTokenDetails(
    tokenAddress: string,
    chain: Chain,
    // marketMaker: MarketMaker,
  ): Promise<ConnectorTokenDetails> {
    const tokenModel = await this.getExternalTokenDetails(
      tokenAddress,
      chain,
      // marketMaker,
    );
    const logoModel = await this.getExternalTokenLogo(tokenAddress, chain);
    tokenModel.logoUrl = logoModel.logoUrl;
    return tokenModel;
  }

  public async fetchExternalTokenBalance(
    userAddress: string,
    tokenAddress: string,
    chain: Chain,
  ): Promise<ConnectorTokenBalance> {
    const apiConnector = this.getDetailsConnector(chain, userAddress);
    const tokenBalanceData = await apiConnector.fetchTokenBalance(tokenAddress);
    return apiConnector.convertTokenBalance(tokenBalanceData);
  }

  private async getExternalTokenDetails(
    tokenAddress: string,
    chain: Chain,
    // marketMaker: MarketMaker,
  ): Promise<ConnectorTokenDetails> {
    // switch (marketMaker) {
    //   case MarketMaker.UNISWAP:
    //     return UniswapTokenDetailsHelper.fetchTokenDetails(
    //       tokenAddress,
    //       this.getMarketConnector(marketMaker),
    //     );
    // }
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
          this.getDetailsConnector(chain),
        );
    }
  }

  // create connector here in case api key is needed from configService
  private getDetailsConnector(
    chain: Chain,
    userAddress?: string,
  ): IDetailsConnector {
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
  private getMarketConnector(
    // marketMaker: MarketMaker
    chain: Chain,
  ): IMarketMakerConnector {
    // switch (marketMaker) {
    //   case MarketMaker.UNISWAP:
    //     return new UniswapConnector();
    //   default:
    //     throw new InternalServerErrorException(
    //       `Market maker ${marketMaker} not implemented`,
    //     );
    // }
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
