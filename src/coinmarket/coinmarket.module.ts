import { forwardRef, Module } from '@nestjs/common';
import { CoinmarketService } from './coinmarket.service';
import { CoinmarketController } from './coinmarket.controller';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { PriceHistoryModule } from 'src/price-history/price-history.module';
import { ConfigModule } from '@nestjs/config';
import { UserCryptosModule } from 'src/user-cryptos/user-cryptos.module';
import { CryptosModule } from 'src/cryptos/cryptos.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    UsersModule,
    PriceHistoryModule,
    UserCryptosModule,
    forwardRef(() => CryptosModule),
  ],
  controllers: [CoinmarketController],
  providers: [CoinmarketService],
  exports: [CoinmarketService],
})
export class CoinmarketModule {}
