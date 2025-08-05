import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoinmarketModule } from './coinmarket/coinmarket.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { CryptosService } from './cryptos/cryptos.service';
import { CryptosModule } from './cryptos/cryptos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crypto',
      password: 'root',
      database: 'db_crypto',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoinmarketModule,
    PriceHistoryModule,
    CryptosModule,
  ],
  controllers: [AppController],
  providers: [AppService, CryptosService],
})
export class AppModule {}
