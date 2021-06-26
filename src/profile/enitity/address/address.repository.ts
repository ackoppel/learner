import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { Profile } from '../profile/profile.entity';
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

  async getProfileAddressList(profile: Profile) {
    return this.createQueryBuilder('a')
      .where({ profile })
      .leftJoinAndSelect('a.coin', 'c')
      .leftJoinAndSelect('a.tokenBalances', 'tb')
      .leftJoinAndSelect('tb.token', 't')
      .getMany();
  }
}
