import axios from 'axios';
import {
  ethPriceInUsdQuery,
  tokenDetailsQuery,
  tokenPriceInEthQuery,
} from './query/query';
import { InternalServerErrorException } from '@nestjs/common';
import { IUniswapTokenPrice } from './price/uniswapTokenPrice.interface';
import { IUniswapTokenDetails } from './details/uniswapTokenDetails.interface';
import { IUniswapEthPrice } from './price/uniswapEthPrice.interface';
import { UniswapTokenDetailsFactory } from './details/uniswapTokenDetails.factory';
import { ConnectorCoinPrice } from '../model/coinPrice.connector';
import { UniswapPriceFactory } from './price/uniswapPrice.factory';
import { ConnectorTokenPrice } from '../model/tokenPrice.connector';
import { ConnectorTokenDetails } from '../model/tokenDetails.connector';
import { IMarketMakerConnector } from '../interface/marketMakerConnector.interface';
import { ICoinPriceConnector } from '../interface/coinPriceConnector.interface';

export class Connector implements IMarketMakerConnector, ICoinPriceConnector {
  private readonly baseUrl =
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

  // token price
  public async fetchTokenPriceInCoin(
    address: string,
  ): Promise<IUniswapTokenPrice> {
    return this.performRequest(tokenPriceInEthQuery(address));
  }

  public convertTokenPrice(
    tokenPrice: IUniswapTokenPrice,
  ): ConnectorTokenPrice {
    return UniswapPriceFactory.toConnectorTokenPrice(tokenPrice);
  }

  // token details
  public async fetchTokenDetails(
    address: string,
  ): Promise<IUniswapTokenDetails> {
    return this.performRequest(tokenDetailsQuery(address));
  }

  public convertTokenDetails(
    tokenData: IUniswapTokenDetails,
  ): ConnectorTokenDetails {
    return UniswapTokenDetailsFactory.toConnectorTokenDetails(tokenData);
  }

  // eth price
  public async fetchCoinPriceUsd(): Promise<IUniswapEthPrice> {
    return this.performRequest(ethPriceInUsdQuery());
  }

  public convertCoinPrice(ethPrice: IUniswapEthPrice): ConnectorCoinPrice {
    return UniswapPriceFactory.toConnectorCoinPrice(ethPrice);
  }

  // request
  private async performRequest(query: string) {
    try {
      const result = await axios.post(this.baseUrl, {
        query,
      });
      return result.data.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
