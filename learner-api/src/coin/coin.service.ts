import { Injectable, OnModuleInit } from '@nestjs/common';
import { CoinRepository } from './entity/coin.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Chain } from './enum/chain';
import { Coin } from './entity/coin.entity';
import { CoinHelper } from './helper/coinHelper';

@Injectable()
export class CoinService implements OnModuleInit {
  constructor(
    @InjectRepository(CoinRepository)
    private coinRepository: CoinRepository,
    private coinHelper: CoinHelper,
  ) {}

  async onModuleInit() {
    // todo :: remove and start a cron on init for supported coins / chains
    const eth = await this.coinHelper.fetchExternalCoinPrice(Chain.ETH);
    await this.coinRepository.injectOrUpdateCoin(eth);
  }

  async getCoin(chain: Chain): Promise<Coin> {
    return this.coinRepository.findOne({ name: chain });
  }

  async getCoins(): Promise<Coin[]> {
    return this.coinRepository.find();
  }
}
