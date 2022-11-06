import { EntityRepository, Repository } from 'typeorm';
import { TokenBalance } from './tokenBalance.entity';
import { Address } from '../../../coin/address/entity/address.entity';
import { Token } from '../../entity/token.entity';
import { ConnectorTokenBalance } from '../../../externalApi/model/tokenBalance.connector';

@EntityRepository(TokenBalance)
export class TokenBalanceRepository extends Repository<TokenBalance> {
  async createOrUpdateBalance(
    address: Address,
    token: Token,
    balance: ConnectorTokenBalance,
  ): Promise<TokenBalance> {
    const model = this.create({
      balance: balance.balance,
      token,
      address,
      lastSync: new Date(),
      dateAdded: new Date(),
    });
    const existingModel = await this.findOne({
      token,
      address,
    });
    if (existingModel) {
      const mergedModel = this.merge(existingModel, {
        balance: model.balance,
        lastSync: model.lastSync,
      });
      return this.save(mergedModel);
    } else {
      return this.save(model);
    }
  }

  async getAllBalancesForSync() {
    return this.createQueryBuilder('tb')
      .leftJoinAndSelect('tb.token', 't')
      .leftJoinAndSelect('t.coin', 'c')
      .leftJoinAndSelect('tb.address', 'a')
      .getMany();
  }

  async deleteEmptyBalances(): Promise<number> {
    const balances = await this.getEmptyBalances();
    await this.remove(balances);
    return balances.length;
  }

  private async getEmptyBalances() {
    return this.createQueryBuilder('tb')
      .where("tb.balance = '0'")
      .andWhere("tb.dateAdded <= (NOW() - INTERVAL '1800 seconds')")
      .getMany();
  }
}
