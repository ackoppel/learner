import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './entity/address.repository';
import { AddAddressDto } from './dto/addAddress.dto';
import { Address } from './entity/address.entity';
import { Chain } from '../enum/chain';
import { ProfileService } from '../../profile/profile.service';
import { CoinService } from '../coin.service';
import { CoinHelper } from '../helper/coinHelper';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    private profileService: ProfileService,
    private coinService: CoinService,
    private coinHelper: CoinHelper,
  ) {}

  async addAddress(
    addAddressDto: AddAddressDto,
    authCredentialsId: string,
  ): Promise<Address> {
    return this.addressRepository.insertOrUpdateAddress(
      await this.coinHelper.fetchExternalCoinBalance(
        addAddressDto.address,
        addAddressDto.chain,
      ),
      await this.profileService.getProfile(authCredentialsId),
      await this.coinService.getCoin(addAddressDto.chain),
    );
  }

  async getProfileAddressList(authCredentialsId: string): Promise<Address[]> {
    return this.addressRepository.find({
      profile: await this.profileService.getProfile(authCredentialsId),
    });
  }

  async getProfileChainAddressList(
    authCredentialsId: string,
    chain: Chain,
  ): Promise<Address[]> {
    return this.addressRepository.find({
      profile: await this.profileService.getProfile(authCredentialsId),
      coin: await this.coinService.getCoin(chain),
    });
  }

  // check if address is added by user and returns it
  async checkAddress(
    authCredentialsId: string,
    userAddress: string,
    chain: Chain,
  ): Promise<Address> {
    const address = await this.getAddress(
      authCredentialsId,
      userAddress,
      chain,
    );
    if (!address) {
      throw new NotFoundException(
        `${chain} address ${userAddress} is not in your address list`,
      );
    }
    return address;
  }

  // simple address with coin and token balance
  private async getAddress(
    authCredentialsId: string,
    contractAddress: string,
    chain: Chain,
  ): Promise<Address> {
    return this.addressRepository.findOne({
      contractAddress,
      profile: await this.profileService.getProfile(authCredentialsId),
      coin: await this.coinService.getCoin(chain),
    });
  }
}
