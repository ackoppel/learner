import { ConnectorCoinPrice } from '../model/coinPrice.connector';
import { IUniswapEthPrice } from '../uniswap/price/uniswapEthPrice.interface';

export type externalData = IUniswapEthPrice;

export interface ICoinPriceConnector {
  fetchCoinPriceUsd(): Promise<externalData>;
  convertCoinPrice(coinPrice: externalData): ConnectorCoinPrice;
}
