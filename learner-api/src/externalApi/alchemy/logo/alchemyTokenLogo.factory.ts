import { IAlchemyTokenLogo } from './alchemyTokenLogo.interface';
import { ConnectorTokenLogo } from '../../model/tokenLogo.connector';

export class AlchemyTokenLogoFactory {
  public static toConnectorTokenLogo(
    token: IAlchemyTokenLogo,
    address: string,
  ): ConnectorTokenLogo {
    const model = new ConnectorTokenLogo();
    model.address = address;
    model.logoUrl = token.result.logo;
    return model;
  }
}
