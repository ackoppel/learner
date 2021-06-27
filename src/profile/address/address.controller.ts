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
import { Chain } from '../../coin/enum/chain';

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

  @Get('/:contractAddress/:chain')
  @UseGuards(JwtGuard)
  async getUserAddress(
    @Request() req: IRequest,
    @Param('contractAddress') contractAddress: string,
    @Param('chain') chain: Chain,
  ): Promise<GetAddressResponseDto> {
    return plainToClass(
      GetAddressResponseDto,
      await this.addressService.getSingleProfileAddress(
        req.user.getAuthCredentialsId(),
        contractAddress,
        chain,
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
