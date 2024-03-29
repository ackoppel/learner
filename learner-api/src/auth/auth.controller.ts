import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { TokenProfileResponseDto } from './dto/tokenProfileResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('login')
  async login(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<TokenProfileResponseDto> {
    return this.authService.login(loginCredentialsDto);
  }
}
