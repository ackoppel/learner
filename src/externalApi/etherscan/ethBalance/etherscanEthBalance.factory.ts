import { ConnectorCoinBalance } from 'src/externalApi/model/coinBalance.connector';
import { IEtherscanEthBalance } from './etherscanEthBalance.interface';
import { Chain } from '../../../coin/enum/chain';

export class EtherScanBalanceFactory {
  public static toConnectorCoinBalance(
    address: string,
    balance: IEtherscanEthBalance,
  ): ConnectorCoinBalance {
    const model = new ConnectorCoinBalance();
    model.contractAddress = address;
    model.coinBalance = balance.result;
    model.chain = Chain.ETH;
    return model;
  }
}
