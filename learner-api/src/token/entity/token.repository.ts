import { EntityRepository, Repository } from 'typeorm';
import { Token } from './token.entity';
import { ConnectorTokenDetails } from '../../externalApi/model/tokenDetails.connector';
import { Coin } from '../../coin/entity/coin.entity';
import { NotFoundException } from '@nestjs/common';
import { ConnectorTokenPrice } from '../../externalApi/model/tokenPrice.connector';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createOrUpdateToken(
    token: ConnectorTokenDetails,
    coin: Coin,
  ): Promise<Token> {
    const model = this.create({
      address: token.address,
      name: token.name,
      symbol: token.symbol,
      priceInCoin: token.priceInCoin,
      coin,
      decimals: token.decimals,
      logoUrl: token.logoUrl,
      lastSync: new Date(),
    });
    const existingModel = await this.findOne({
      address: model.address,
      coin,
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

  async updateTokenPrice(
    tokenPrice: ConnectorTokenPrice,
    coin: Coin,
  ): Promise<Token> {
    const model = await this.findOne({
      address: tokenPrice.address,
      coin,
    });
    const mergedModel = this.merge(model, {
      priceInCoin: tokenPrice.priceInCoin,
      lastSync: new Date(),
    });
    return this.save(mergedModel);
  }

  async checkToken(address: string, coin: Coin): Promise<Token> {
    const token = await this.findOne({
      address,
      coin,
    });
    if (!token) {
      throw new NotFoundException(
        `Please add ${coin.name} chain token with address ${address} to keep track of your balance`,
      );
    }
    return token;
  }
}
