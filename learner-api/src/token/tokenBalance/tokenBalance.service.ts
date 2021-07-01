import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenBalanceRepository } from './entity/tokenBalance.repository';
import { Address } from '../../coin/address/entity/address.entity';
import { Token } from '../entity/token.entity';
import { Chain } from '../../coin/enum/chain';
import { AddressService } from '../../coin/address/address.service';
import { TokenBalance } from './entity/tokenBalance.entity';
import { CoinService } from '../../coin/coin.service';
import { TokenRepository } from '../entity/token.repository';
import { TokenHelper } from '../helper/tokenHelper';

@Injectable()
export class TokenBalanceService {
  constructor(
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private coinService: CoinService,
    private addressService: AddressService,
    private tokenHelper: TokenHelper,
  ) {}

  async getUserAddressTokenBalanceList(
    authCredentialsId: string,
    userAddress: string,
    chain: Chain,
  ): Promise<TokenBalance[]> {
    return this.tokenBalanceRepository.find({
      address: await this.addressService.checkAddress(
        authCredentialsId,
        userAddress,
        chain,
      ),
    });
  }

  async getUserAddressTokenBalance(
    authCredentialsId: string,
    userAddress: string,
    tokenAddress: string,
    chain: Chain,
  ): Promise<TokenBalance> {
    return this.tokenBalanceRepository.findOne({
      address: await this.addressService.checkAddress(
        authCredentialsId,
        userAddress,
        chain,
      ),
      token: await this.tokenRepository.checkToken(
        tokenAddress,
        await this.coinService.getCoin(chain),
      ),
    });
  }

  async fetchAndInsertTokenBalance(
    address: Address,
    token: Token,
  ): Promise<TokenBalance> {
    return this.tokenBalanceRepository.createOrUpdateBalance(
      address,
      token,
      await this.tokenHelper.fetchExternalTokenBalance(
        address.contractAddress,
        token.address,
        token.coin.name,
      ),
    );
  }
}
