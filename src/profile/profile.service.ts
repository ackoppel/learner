import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProfileRepository } from './enitity/profile/profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from '../auth/entity/auth-credentials.entity';
import { UpdateProfileRequestDto } from './dto/updateProfileRequest.dto';
import { Profile } from './enitity/profile/profile.entity';
import { AuthCredentialsRepository } from '../auth/auth-credentials.repository';
import { AddressRepository } from './enitity/address/address.repository';
import { Chain } from '../coin/enum/chain';
import { AddAddressDto } from '../token/dto/addAddress.dto';
import { Address } from './enitity/address/address.entity';
import { Connector as EtherscanConnector } from '../externalApi/etherscan/connector';
import { ConfigService } from '@nestjs/config';
import { EtherScanBalanceFactory } from '../externalApi/etherscan/ethBalance/etherScanBalance.factory';
import { ConnectorCoinBalance } from '../externalApi/model/coinBalance.connector';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    @InjectRepository(AuthCredentialsRepository)
    private authCredentialRepository: AuthCredentialsRepository,
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    private configService: ConfigService,
  ) {}

  async createProfile(authCredentials: AuthCredentials): Promise<void> {
    return this.profileRepository.createProfile(authCredentials);
  }

  async getProfile(authCredentialsId: string): Promise<Profile> {
    const authCredentials = await this.authCredentialRepository.findOne({
      id: authCredentialsId,
    });
    return this.profileRepository.findOne({ authCredentials });
  }

  async updateProfile(
    updateProfileRequestDto: UpdateProfileRequestDto,
    authCredentialsId: string,
  ): Promise<Profile> {
    const profile = await this.getProfile(authCredentialsId);
    return this.profileRepository.updateProfile(
      updateProfileRequestDto,
      profile,
    );
  }

  async addAddress(
    addAddressDto: AddAddressDto,
    authCredentialsId: string,
  ): Promise<Address> {
    const profile = await this.getProfile(authCredentialsId);
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
    const ethBalance = await this.getEthBalance(addAddressDto.address);
    return this.addressRepository.insertOrUpdateAddress(ethBalance, profile);
  }

  private async getEthBalance(
    contractAddress: string,
  ): Promise<ConnectorCoinBalance> {
    const apiConnector = new EtherscanConnector(
      this.configService.get<string>('etherScan.key'),
    );
    const ethBalanceData = await apiConnector.fetchEthBalance(contractAddress);
    if (ethBalanceData.status !== '1') {
      throw new InternalServerErrorException(
        'Please check the provided address',
      );
    }
    return EtherScanBalanceFactory.toConnectorCoinBalance(
      contractAddress,
      ethBalanceData,
    );
  }

  async hasAddresses(
    authCredentialsId: string,
    chain: Chain,
  ): Promise<boolean> {
    const profile = await this.getProfile(authCredentialsId);
    const addressList = await this.addressRepository.find({ profile, chain });
    return !!addressList.length;
  }
}
