import {
  Controller,
  Patch,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from '../auth/jwtGuard';
import { IRequest } from '../auth/interface/request';
import { UpdateProfileRequestDto } from './dto/updateProfileRequest.dto';
import { ProfileResponseDto } from './dto/profileResponse.dto';
import { plainToClass } from 'class-transformer';
import { TokenProfileResponseDto } from '../auth/dto/tokenProfileResponse.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getProfile(@Request() req: IRequest): Promise<TokenProfileResponseDto> {
    return this.profileService.getProfileWithAccessToken(
      req.user.getAuthCredentialsId(),
    );
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateProfile(
    @Request() req: IRequest,
    @Body() updateProfileRequestDto: UpdateProfileRequestDto,
  ): Promise<ProfileResponseDto> {
    return plainToClass(
      ProfileResponseDto,
      await this.profileService.updateProfile(
        updateProfileRequestDto,
        req.user.getAuthCredentialsId(),
      ),
    );
  }
}
