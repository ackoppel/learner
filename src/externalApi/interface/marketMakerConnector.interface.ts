import { IUniswapTokenDetails } from '../uniswap/details/uniswapTokenDetails.interface';
import { ConnectorTokenDetails } from '../model/tokenDetails.connector';
import { IUniswapTokenPrice } from '../uniswap/price/uniswapTokenPrice.interface';
import { ConnectorTokenPrice } from '../model/tokenPrice.connector';

export type externalData = IUniswapTokenDetails | IUniswapTokenPrice;

export interface IMarketMakerConnector {
  fetchTokenPriceInCoin(address: string): Promise<externalData>;
  convertTokenPrice(tokenData: externalData): ConnectorTokenPrice;

  fetchTokenDetails(address: string): Promise<externalData>;
  convertTokenDetails(tokenData: externalData): ConnectorTokenDetails;
}
