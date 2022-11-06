import { IUniswapTokenDetails } from './uniswapTokenDetails.interface';
import { ConnectorTokenDetails } from '../../model/tokenDetails.connector';
import { Chain } from '../../../coin/enum/chain';

export class UniswapTokenDetailsFactory {
  public static toConnectorTokenDetails(
    token: IUniswapTokenDetails,
  ): ConnectorTokenDetails {
    const model = new ConnectorTokenDetails();
    model.address = token.token.id;
    model.name = token.token.name;
    model.symbol = token.token.symbol;
    model.decimals = parseInt(token.token.decimals);
    model.priceInCoin = token.token.derivedETH;
    model.chain = Chain.ETH;
    return model;
  }
}
