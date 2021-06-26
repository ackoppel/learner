import { Injectable, OnModuleInit } from '@nestjs/common';
import { CoinRepository } from './entity/coin.repository';
import { InjectRepository } from '@nestjs/typeorm';
// todo :: remove after cron creation
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { Chain } from './enum/chain';
import { Coin } from './entity/coin.entity';

@Injectable()
export class CoinService implements OnModuleInit {
  constructor(
    @InjectRepository(CoinRepository)
    private coinRepository: CoinRepository,
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
}
