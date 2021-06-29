import { IUniswapTokenDetails } from '../uniswap/details/uniswapTokenDetails.interface';
import { ConnectorTokenDetails } from '../model/tokenDetails.connector';
import { IUniswapEthPrice } from '../uniswap/price/uniswapEthPrice.interface';
import { ConnectorCoinPrice } from '../model/coinPrice.connector';
import { IUniswapTokenPrice } from '../uniswap/price/uniswapTokenPrice.interface';
import { ConnectorTokenPrice } from '../model/tokenPrice.connector';

export type externalData =
  | IUniswapTokenDetails
  | IUniswapEthPrice
  | IUniswapTokenPrice;

export interface IMarketMakerConnector {
  fetchTokenPriceInEth(address: string): Promise<externalData>;
  convertTokenPrice(tokenData: externalData): ConnectorTokenPrice;

  fetchTokenDetails(address: string): Promise<externalData>;
  convertTokenDetails(tokenData: externalData): ConnectorTokenDetails;

  fetchEthPriceUsd?(): Promise<externalData>;
  convertEthPrice?(ethPrice: externalData): ConnectorCoinPrice;
}
