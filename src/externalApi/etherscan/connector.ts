import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { IEtherscanEthBalance } from './ethBalance/etherscanEthBalance.interface';
import { ConnectorCoinBalance } from '../model/coinBalance.connector';
import { EtherScanBalanceFactory } from './ethBalance/etherscanEthBalance.factory';

enum Module {
  account = 'account',
}

enum Action {
  balance = 'balance',
}

export class Connector {
  private baseUrl = 'https://api.etherscan.io/api';

  constructor(private apiKey: string) {}

  public async fetchEthBalance(
    userAddress: string,
  ): Promise<IEtherscanEthBalance> {
    return this.performRequest(
      this.toEthBalanceEndpoint(Module.account, Action.balance, userAddress),
    );
  }

  public convertEthBalance(
    address: string,
    balance: IEtherscanEthBalance,
  ): ConnectorCoinBalance {
    return EtherScanBalanceFactory.toConnectorCoinBalance(address, balance);
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

  private toEthBalanceEndpoint(
    module: Module,
    action: Action,
    userAddress: string,
  ) {
    return `?module=${module}&action=${action}&address=${userAddress}&tag=latest&apiKey=${this.apiKey}`;
  }
}
