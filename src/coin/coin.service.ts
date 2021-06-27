import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { CoinRepository } from './entity/coin.repository';
import { InjectRepository } from '@nestjs/typeorm';
// todo :: remove after cron creation
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { Chain } from './enum/chain';
import { Coin } from './entity/coin.entity';
import { ConnectorCoinBalance } from '../externalApi/model/coinBalance.connector';
import { Connector as EtherscanConnector } from '../externalApi/etherscan/connector';
import { EtherscanBalanceFactory } from '../externalApi/etherscan/ethBalance/etherscanEthBalance.factory';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoinService implements OnModuleInit {
  constructor(
    @InjectRepository(CoinRepository)
    private coinRepository: CoinRepository,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const eth = await this.getEthPrice();
    await this.coinRepository.injectOrUpdateCoin(eth);
  }

  // todo :: remove and start a cron on init for supported coins / chains
  async getEthPrice() {
    const connector = new UniswapConnector();
    const result = await connector.fetchEthPriceInUsd();
    return connector.convertEthPrice(result);
  }

  async getCoin(chain: Chain): Promise<Coin> {
    return this.coinRepository.findOne({ name: chain });
  }

  async fetchExternalEthBalance(
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
}
