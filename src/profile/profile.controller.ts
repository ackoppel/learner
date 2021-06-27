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

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getProfile(@Request() req: IRequest): Promise<ProfileResponseDto> {
    const profile = await this.profileService.getProfile(
      req.user.getAuthCredentialsId(),
    );
    return plainToClass(ProfileResponseDto, profile);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateProfile(
    @Request() req: IRequest,
    @Body() updateProfileRequestDto: UpdateProfileRequestDto,
  ): Promise<ProfileResponseDto> {
    const updated = await this.profileService.updateProfile(
      updateProfileRequestDto,
      req.user.getAuthCredentialsId(),
    );
    return plainToClass(ProfileResponseDto, updated);
  }
}
