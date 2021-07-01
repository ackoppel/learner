import { Injectable } from '@nestjs/common';
import { TokenRepository } from './entity/token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from './dto/createToken.dto';
import { Chain } from '../coin/enum/chain';
import { Token } from './entity/token.entity';
import { CoinService } from '../coin/coin.service';
import { TokenBalanceService } from './tokenBalance/tokenBalance.service';
import { AddressService } from '../coin/address/address.service';
import { TokenHelper } from './helper/tokenHelper';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private addressService: AddressService,
    private tokenBalanceService: TokenBalanceService,
    private coinService: CoinService,
    private tokenHelper: TokenHelper,
  ) {}

  async getExistingTokenList(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async getExistingToken(address: string, chain: Chain): Promise<Token> {
    return await this.tokenRepository.checkToken(
      address,
      await this.coinService.getCoin(chain),
    );
  }

  async addToken(
    createTokenDto: CreateTokenDto,
    authCredentialsId: string,
    chain: Chain,
  ): Promise<Token> {
    const address = await this.addressService.checkAddress(
      authCredentialsId,
      createTokenDto.userAddress,
      chain,
    );
    const token = await this.tokenRepository.createOrUpdateToken(
      await this.tokenHelper.fetchExternalTokenDetails(
        createTokenDto.tokenAddress,
        chain,
      ),
      await this.coinService.getCoin(chain),
    );
    await this.tokenBalanceService.fetchAndInsertTokenBalance(address, token);
    return token;
  }
}
