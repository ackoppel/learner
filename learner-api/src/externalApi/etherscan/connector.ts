import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { IEtherscanEthBalance } from './ethBalance/etherscanEthBalance.interface';
import { ConnectorCoinBalance } from '../model/coinBalance.connector';
import { EtherscanBalanceFactory } from './ethBalance/etherscanEthBalance.factory';
import { ICoinBalanceConnector } from '../interface/coinBalanceConnector.interface';

enum Module {
  account = 'account',
}

enum Action {
  balance = 'balance',
}

export class Connector implements ICoinBalanceConnector {
  private baseUrl = 'https://api.etherscan.io/api';

  constructor(private apiKey: string) {}

  public async fetchCoinBalance(
    userAddress: string,
  ): Promise<IEtherscanEthBalance> {
    return this.performRequest(this.toEthBalanceEndpoint(userAddress));
  }

  public convertCoinBalance(
    address: string,
    balance: IEtherscanEthBalance,
  ): ConnectorCoinBalance {
    return EtherscanBalanceFactory.toConnectorCoinBalance(address, balance);
  }

  private async performRequest(endPoint: string) {
    try {
      const response = await axios.get(`${this.baseUrl}${endPoint}`);
      return response.data;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  private toEthBalanceEndpoint(userAddress: string) {
    return `?module=${Module.account}&action=${Action.balance}&address=${userAddress}&tag=latest&apiKey=${this.apiKey}`;
  }
}
