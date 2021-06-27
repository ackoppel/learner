import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { Profile } from '../../enitity/profile.entity';
import { ConnectorCoinBalance } from '../../../externalApi/model/coinBalance.connector';
import { Coin } from '../../../coin/entity/coin.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async insertOrUpdateAddress(
    addressData: ConnectorCoinBalance,
    profile: Profile,
    coin: Coin,
  ): Promise<Address> {
    const model = this.create({
      contractAddress: addressData.contractAddress,
      coinBalance: addressData.coinBalance,
      profile,
      coin,
      lastSync: new Date(),
    });
    const existingModel = await this.findOne({
      contractAddress: model.contractAddress,
      coin,
      profile,
    });
    if (existingModel) {
      const mergedModel = this.merge(existingModel, {
        coinBalance: model.coinBalance,
        lastSync: model.lastSync,
      });
      return this.save(mergedModel);
    } else {
      return this.save(model);
    }
  }

  // todo :: find a way to connect below two queries
  async getProfileAddress(
    profile: Profile,
    coin: Coin,
    contractAddress: string,
  ): Promise<Address> {
    return this.createQueryBuilder('a')
      .where({ profile, coin, contractAddress })
      .leftJoinAndSelect('a.coin', 'c')
      .leftJoinAndSelect('a.tokenBalances', 'tb')
      .leftJoinAndSelect('tb.token', 't')
      .leftJoinAndSelect('t.coin', 'c2') // join to token for calculating value
      .getOne();
  }

  async getProfileAddressList(profile: Profile): Promise<Address[]> {
    return this.createQueryBuilder('a')
      .where({ profile })
      .leftJoinAndSelect('a.coin', 'c')
      .leftJoinAndSelect('a.tokenBalances', 'tb')
      .leftJoinAndSelect('tb.token', 't')
      .leftJoinAndSelect('t.coin', 'c2') // join to token for calculating value
      .getMany();
  }
}
