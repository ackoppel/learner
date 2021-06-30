import { ITokenLogoConnector } from '../../interface/tokenLogoConnector.interface';
import { ConnectorTokenLogo } from '../../model/tokenLogo.connector';

export class AlchemyTokenLogoHelper {
  static async fetchTokenLogo(
    tokenAddress: string,
    apiConnector: ITokenLogoConnector,
  ): Promise<ConnectorTokenLogo> {
    const logoData = await apiConnector.fetchTokenLogo(tokenAddress);
    if ('error' in logoData) {
      return { address: tokenAddress, logoUrl: null };
    }
    return apiConnector.convertTokenLogo(logoData, tokenAddress);
  }
}
