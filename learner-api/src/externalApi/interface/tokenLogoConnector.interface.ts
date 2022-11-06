import { IAlchemyTokenLogo } from '../alchemy/logo/alchemyTokenLogo.interface';
import { IAlchemyTokenLogoError } from '../alchemy/logo/alchemyTokenLogoError.interface';
import { ConnectorTokenLogo } from '../model/tokenLogo.connector';

export type externalData = IAlchemyTokenLogo | IAlchemyTokenLogoError;

export interface ITokenLogoConnector {
  fetchTokenLogo(tokenAddress: string): Promise<externalData>;
  convertTokenLogo(
    tokenLogo: externalData,
    tokenAddress: string,
  ): ConnectorTokenLogo;
}
