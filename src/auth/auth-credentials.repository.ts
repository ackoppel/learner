import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentials } from './entity/auth-credentials.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(AuthCredentials)
export class AuthCredentialsRepository extends Repository<AuthCredentials> {
  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthCredentials> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const authCredentials = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(authCredentials);
      return authCredentials;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
