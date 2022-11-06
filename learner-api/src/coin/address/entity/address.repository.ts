import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { Profile } from '../../../profile/enitity/profile.entity';
import { ConnectorCoinBalance } from '../../../externalApi/model/coinBalance.connector';
import { Coin } from '../../entity/coin.entity';

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

  async getAllAddressesForSync() {
    return this.createQueryBuilder('a')
      .innerJoinAndSelect('a.profile', 'p')
      .innerJoinAndSelect('a.coin', 'c')
      .getMany();
  }
}
