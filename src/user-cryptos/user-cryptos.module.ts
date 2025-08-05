import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCrypto } from './entities/user-crypto.entity';
import { UserCryptosController } from './user-cryptos.controller';
import { UserCryptosService } from './user-cryptos.service';
import { User } from 'src/users/entities/user.entity';
import { Crypto } from 'src/cryptos/entities/crypto.entity';
import { UsersModule } from 'src/users/users.module';
import { CryptosModule } from 'src/cryptos/cryptos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCrypto, User, Crypto]),
    UsersModule,
    CryptosModule,
  ],
  controllers: [UserCryptosController],
  providers: [UserCryptosService],
  exports: [TypeOrmModule],
})
export class UserCryptosModule {}
