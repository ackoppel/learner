import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { IAlchemyTokenLogo } from './logo/alchemyTokenLogo.interface';
import { IAlchemyTokenLogoError } from './logo/alchemyTokenLogoError.interface';
import { ConnectorTokenLogo } from '../model/tokenLogo.connector';
import { AlchemyTokenLogoFactory } from './logo/alchemyTokenLogo.factory';
import { IAlchemyTokenBalance } from './balance/alchemyTokenBalance.interface';
import { ConnectorTokenBalance } from '../model/tokenBalance.connector';
import { AlchemyTokenBalanceFactory } from './balance/alchemyTokenBalance.factory';

enum MethodType {
  tokenMetadata = 'alchemy_getTokenMetadata',
  tokenBalance = 'alchemy_getTokenBalances',
}

interface IRequestParams {
  params: any[];
  method: MethodType;
}

export class Connector {
  private baseUrl = 'https://eth-mainnet.alchemyapi.io/v2/';

  constructor(private apiKey: string, private userAddress: string) {}

  public async fetchTokenLogo(
    tokenAddress: string,
  ): Promise<IAlchemyTokenLogo | IAlchemyTokenLogoError> {
    return this.performRequest({
      params: [tokenAddress.toLowerCase()],
      method: MethodType.tokenMetadata,
    });
  }

  public convertTokenLogo(
    tokenLogo: IAlchemyTokenLogo,
    address: string,
  ): ConnectorTokenLogo {
    return AlchemyTokenLogoFactory.toConnectorTokenLogo(tokenLogo, address);
  }

  public async fetchTokenBalance(
    tokenAddress: string,
  ): Promise<IAlchemyTokenBalance> {
    return this.performRequest({
      params: [this.userAddress, [tokenAddress.toLowerCase()]],
      method: MethodType.tokenBalance,
    });
  }

  public convertTokenBalance(
    tokenBalance: IAlchemyTokenBalance,
  ): ConnectorTokenBalance {
    return AlchemyTokenBalanceFactory.toConnectorTokenBalance(
      tokenBalance,
      this.userAddress,
    );
  }

  private async performRequest(params: IRequestParams) {
    try {
      const result = await axios.post(`${this.baseUrl}${this.apiKey}`, {
        jsonrpc: '2.0',
        method: params.method,
        params: params.params,
        id: 1,
      });
      return result.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
