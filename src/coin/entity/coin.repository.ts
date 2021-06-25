import { EntityRepository, Repository } from 'typeorm';
import { Coin } from './coin.entity';
import { ConnectorCoinPrice } from '../../externalApi/model/coinPrice.connector';

@EntityRepository(Coin)
export class CoinRepository extends Repository<Coin> {
  async injectOrUpdateCoin(data: ConnectorCoinPrice) {
    const model = this.create({
      name: data.chain,
      priceUsd: data.priceUsd,
      lastSync: new Date(),
      decimals: data.decimals,
    });
    const existingModel = await this.findOne({
      name: model.name,
    });
    if (existingModel) {
      const mergedModel = this.merge(existingModel, {
        priceUsd: model.priceUsd,
        lastSync: model.lastSync,
      });
      await this.save(mergedModel);
    } else {
      await this.save(model);
    }
  }
}
