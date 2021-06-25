import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { Profile } from '../profile/profile.entity';
import { ConnectorCoinBalance } from '../../../externalApi/model/coinBalance.connector';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async insertOrUpdateAddress(
    addressData: ConnectorCoinBalance,
    profile: Profile,
  ): Promise<Address> {
    const model = this.create({
      ...addressData,
      profile,
      lastSync: new Date(),
    });
    const existingModel = await this.findOne({
      contractAddress: model.contractAddress,
      chain: model.chain,
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
}
