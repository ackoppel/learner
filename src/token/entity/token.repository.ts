import { EntityRepository, Repository } from 'typeorm';
import { Token } from './token.entity';
import { CreateTokenDto } from '../dto/createToken.dto';
import { ConnectorTokenDetails } from '../../externalApi/model/tokenDetails.connector';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createToken(token: ConnectorTokenDetails) {
    const model = this.create({ ...token, lastSync: new Date() });
    const existingModel = await this.findOne({
      address: model.address,
      chain: model.chain,
    });
    if (existingModel) {
      const mergedModel = this.merge(existingModel, {
        priceInCoin: model.priceInCoin,
        lastSync: model.lastSync,
      });
      return this.save(mergedModel);
    } else {
      return this.save(model);
    }
  }
}
