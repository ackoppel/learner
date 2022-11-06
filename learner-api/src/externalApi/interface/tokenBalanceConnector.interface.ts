import { ConnectorTokenBalance } from '../model/tokenBalance.connector';
import { IAlchemyTokenBalance } from '../alchemy/balance/alchemyTokenBalance.interface';

export type externalData = IAlchemyTokenBalance;

export interface ITokenBalanceConnector {
  fetchTokenBalance(tokenAddress: string): Promise<externalData>;
  convertTokenBalance(tokenBalance: externalData): ConnectorTokenBalance;
}
