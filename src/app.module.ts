import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/appConfig';
import { ProfileModule } from './profile/profile.module';
import { TokenModule } from './token/token.module';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        database: configService.get<string>('db.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    TokenModule,
    ProfileModule,
    CoinModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
