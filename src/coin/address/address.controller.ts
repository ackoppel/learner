import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
import { GetAddressQuery } from './query/getAddress.query';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUserAddressList(
    @Request() req: IRequest,
    @Query() query: GetAddressQuery,
  ): Promise<GetAddressResponseDto[] | GetAddressResponseDto> {
    switch (true) {
      // query was provided
      case !!query.chain && !!query.userAddress:
        return plainToClass(
          GetAddressResponseDto,
          await this.addressService.checkAddress(
            req.user.getAuthCredentialsId(),
            query.userAddress,
            query.chain,
          ),
        );
      //query was not defined
      default:
        return plainToClass(
          GetAddressResponseDto,
          await this.addressService.getProfileAddressList(
            req.user.getAuthCredentialsId(),
          ),
        );
    }
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
