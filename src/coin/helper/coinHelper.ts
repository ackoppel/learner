import { Chain } from '../enum/chain';
import { ConnectorCoinBalance } from '../../externalApi/model/coinBalance.connector';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EtherscanBalanceFactory } from '../../externalApi/etherscan/ethBalance/etherscanEthBalance.factory';
import { Connector as EtherscanConnector } from '../../externalApi/etherscan/connector';
import { ConfigService } from '@nestjs/config';
import { Connector as UniswapConnector } from '../../externalApi/uniswap/connector';
import { ConnectorCoinPrice } from '../../externalApi/model/coinPrice.connector';

@Injectable()
export class CoinHelper {
  constructor(private configService: ConfigService) {}

  public async fetchExternalCoinBalance(
    address: string,
    chain: Chain,
  ): Promise<ConnectorCoinBalance> {
    switch (chain) {
      case Chain.ETH:
        return this.fetchEthBalance(address);
    }
  }

  public async fetchExternalCoinPrice(
    chain: Chain,
  ): Promise<ConnectorCoinPrice> {
    switch (chain) {
      case Chain.ETH:
        return this.fetchEthPrice();
    }
  }

  private async fetchEthPrice(): Promise<ConnectorCoinPrice> {
    const connector = this.createPriceApiConnector(Chain.ETH);
    const result = await connector.fetchEthPriceUsd();
    return connector.convertEthPrice(result);
  }

  private async fetchEthBalance(
    contractAddress: string,
  ): Promise<ConnectorCoinBalance> {
    const apiConnector = this.createBalanceApiConnector(Chain.ETH);
    const ethBalanceData = await apiConnector.fetchEthBalance(contractAddress);
    if (ethBalanceData.status !== '1') {
      throw new InternalServerErrorException(
        'Please check the provided address',
      );
    }
    return EtherscanBalanceFactory.toConnectorCoinBalance(
      contractAddress,
      ethBalanceData,
    );
  }

  private createBalanceApiConnector(chain: Chain) {
    switch (chain) {
      case Chain.ETH:
        return new EtherscanConnector(
          this.configService.get<string>('etherScan.key'),
        );
      default:
        throw new InternalServerErrorException('Chain not implemented');
    }
  }

  private createPriceApiConnector(chain: Chain) {
    switch (chain) {
      case Chain.ETH:
        return new UniswapConnector();
    }
  }
}
