import { Chain } from '../enum/chain';
import { ConnectorCoinBalance } from '../../externalApi/model/coinBalance.connector';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connector as EtherscanConnector } from '../../externalApi/etherscan/connector';
import { ConfigService } from '@nestjs/config';
import { Connector as UniswapConnector } from '../../externalApi/uniswap/connector';
import { ConnectorCoinPrice } from '../../externalApi/model/coinPrice.connector';
import { EtherscanCoinBalanceHelper } from '../../externalApi/etherscan/helper/coinBalance.helper';
import { ICoinPriceConnector } from '../../externalApi/interface/coinPriceConnector.interface';
import { ICoinBalanceConnector } from '../../externalApi/interface/coinBalanceConnector.interface';

@Injectable()
export class CoinHelper {
  constructor(private configService: ConfigService) {}

  public async fetchExternalCoinBalance(
    address: string,
    chain: Chain,
  ): Promise<ConnectorCoinBalance> {
    switch (chain) {
      case Chain.ETH:
        return EtherscanCoinBalanceHelper.fetchCoinBalance(
          address,
          this.createBalanceApiConnector(chain),
        );
    }
  }

  public async fetchExternalCoinPrice(
    chain: Chain,
  ): Promise<ConnectorCoinPrice> {
    const connector = this.createPriceApiConnector(chain);
    const result = await connector.fetchCoinPriceUsd();
    return connector.convertCoinPrice(result);
  }

  private createBalanceApiConnector(chain: Chain): ICoinBalanceConnector {
    switch (chain) {
      case Chain.ETH:
        return new EtherscanConnector(
          this.configService.get<string>('etherScan.key'),
        );
      default:
        throw new InternalServerErrorException('Chain not implemented');
    }
  }

  private createPriceApiConnector(chain: Chain): ICoinPriceConnector {
    switch (chain) {
      case Chain.ETH:
        return new UniswapConnector();
    }
  }
}
