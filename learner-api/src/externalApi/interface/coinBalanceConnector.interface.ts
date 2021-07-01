import { IEtherscanEthBalance } from '../etherscan/ethBalance/etherscanEthBalance.interface';
import { ConnectorCoinBalance } from '../model/coinBalance.connector';

export type externalData = IEtherscanEthBalance;

export interface ICoinBalanceConnector {
  fetchCoinBalance(userAddress: string): Promise<externalData>;
  convertCoinBalance(
    address: string,
    balance: externalData,
  ): ConnectorCoinBalance;
}
