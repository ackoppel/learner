import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { JwtGuard } from '../../auth/jwtGuard';
import { IRequest } from '../../auth/interface/request';
import { GetAddressResponseDto } from './dto/getAddressResponse.dto';
import { plainToClass } from 'class-transformer';
import { AddAddressDto } from './dto/addAddress.dto';
import { AddAddressResponseDto } from './dto/addAddressResponse.dto';
import { AddressChainParams } from '../dto/addressChain.params';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('/all')
  @UseGuards(JwtGuard)
  async getUserAddressList(
    @Request() req: IRequest,
  ): Promise<GetAddressResponseDto[]> {
    return plainToClass(
      GetAddressResponseDto,
      await this.addressService.getProfileAddressList(
        req.user.getAuthCredentialsId(),
      ),
    );
  }

  @Get('/:userAddress/:chain')
  @UseGuards(JwtGuard)
  async getUserAddress(
    @Request() req: IRequest,
    @Param() params: AddressChainParams,
  ): Promise<GetAddressResponseDto> {
    return plainToClass(
      GetAddressResponseDto,
      await this.addressService.getSingleProfileAddress(
        req.user.getAuthCredentialsId(),
        params.userAddress,
        params.chain,
      ),
    );
  }

  @Post()
  @UseGuards(JwtGuard)
  async addEthAddress(
    @Body() addAddressDto: AddAddressDto,
    @Request() req: IRequest,
  ): Promise<AddAddressResponseDto> {
    return plainToClass(
      AddAddressResponseDto,
      await this.addressService.addAddress(
        addAddressDto,
        req.user.getAuthCredentialsId(),
      ),
    );
  }
}
