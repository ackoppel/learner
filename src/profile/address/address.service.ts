import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './entity/address.repository';
import { AddAddressDto } from './dto/addAddress.dto';
import { Address } from './entity/address.entity';
import { Chain } from '../../coin/enum/chain';
import { Profile } from '../enitity/profile.entity';
import { ProfileService } from '../profile.service';
import { CoinService } from '../../coin/coin.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    private profileService: ProfileService,
    private coinService: CoinService,
  ) {}

  async addAddress(
    addAddressDto: AddAddressDto,
    authCredentialsId: string,
  ): Promise<Address> {
    const profile = await this.profileService.getProfile(authCredentialsId);
    switch (addAddressDto.chain) {
      case Chain.ETH:
        return this.addEthAddress(profile, addAddressDto);
      default:
        throw new InternalServerErrorException();
    }
  }

  private async addEthAddress(
    profile: Profile,
    addAddressDto: AddAddressDto,
  ): Promise<Address> {
    return this.addressRepository.insertOrUpdateAddress(
      await this.coinService.fetchExternalEthBalance(addAddressDto.address),
      profile,
      await this.coinService.getCoin(addAddressDto.chain),
    );
  }

  async getProfileAddressList(authCredentialsId: string): Promise<Address[]> {
    return this.addressRepository.getProfileAddressList(
      await this.profileService.getProfile(authCredentialsId),
    );
  }

  // detailed address with token balances
  async getSingleProfileAddress(
    authCredentialsId: string,
    contractAddress: string,
    chain: Chain,
  ): Promise<Address> {
    const address = await this.addressRepository.getProfileAddress(
      await this.profileService.getProfile(authCredentialsId),
      await this.coinService.getCoin(chain),
      contractAddress,
    );
    if (!address) {
      throw new NotFoundException(
        `${chain} address ${contractAddress} is not in your address list`,
      );
    }
    return address;
  }

  // simple address with coin
  async getAddress(
    authCredentialsId: string,
    contractAddress: string,
    chain: Chain,
  ): Promise<Address> {
    const profile = await this.profileService.getProfile(authCredentialsId);
    const coin = await this.coinService.getCoin(chain);
    return this.addressRepository.findOne({
      contractAddress,
      profile,
      coin,
    });
  }

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
      throw new BadRequestException(
        `You must add ${chain} address "${userAddress}" to add tokens`,
      );
    }
    return address;
  }
}
