import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';
import { CoinmarketModule } from 'src/coinmarket/coinmarket.module';
import { Crypto } from './entities/crypto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crypto]),
    forwardRef(() => CoinmarketModule),
  ],
  controllers: [CryptosController],
  providers: [CryptosService],
  exports: [TypeOrmModule, CryptosService],
})
export class CryptosModule {}
