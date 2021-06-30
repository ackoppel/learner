import { ConnectorTokenPrice } from '../../model/tokenPrice.connector';
import { IUniswapTokenPrice } from './uniswapTokenPrice.interface';
import { IUniswapEthPrice } from './uniswapEthPrice.interface';
import { ConnectorCoinPrice } from '../../model/coinPrice.connector';
import { Chain } from '../../../coin/enum/chain';

export class UniswapPriceFactory {
  public static toConnectorTokenPrice(
    tokenPrice: IUniswapTokenPrice,
  ): ConnectorTokenPrice {
    const model = new ConnectorTokenPrice();
    model.address = tokenPrice.token.id;
    model.priceInCoin = tokenPrice.token.derivedETH;
    model.chain = Chain.ETH;
    return model;
  }

  public static toConnectorCoinPrice(
    ethPrice: IUniswapEthPrice,
  ): ConnectorCoinPrice {
    const model = new ConnectorCoinPrice();
    model.chain = Chain.ETH;
    model.priceUsd = ethPrice.bundle.ethPrice;
    model.decimals = 18;
    return model;
  }
}
