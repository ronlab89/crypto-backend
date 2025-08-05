import { Crypto } from 'src/cryptos/entities/crypto.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('user_cryptos')
export class UserCrypto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cryptos)
  user: User;

  @ManyToOne(() => Crypto, (crypto) => crypto.userCryptos)
  crypto: Crypto;
}
