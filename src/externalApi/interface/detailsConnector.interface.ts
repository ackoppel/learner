import { IAlchemyTokenLogo } from '../alchemy/logo/alchemyTokenLogo.interface';
import { IAlchemyTokenLogoError } from '../alchemy/logo/alchemyTokenLogoError.interface';
import { ConnectorTokenLogo } from '../model/tokenLogo.connector';
import { IAlchemyTokenBalance } from '../alchemy/balance/alchemyTokenBalance.interface';
import { ConnectorTokenBalance } from '../model/tokenBalance.connector';

export type ExternalData =
  | IAlchemyTokenLogo
  | IAlchemyTokenLogoError
  | IAlchemyTokenBalance;

export interface IDetailsConnector {
  fetchTokenLogo(tokenAddress: string): Promise<ExternalData>;
  convertTokenLogo(
    tokenLogo: ExternalData,
    tokenAddress: string,
  ): ConnectorTokenLogo;

  fetchTokenBalance(tokenAddress: string): Promise<ExternalData>;
  convertTokenBalance(tokenBalance: ExternalData): ConnectorTokenBalance;
}
