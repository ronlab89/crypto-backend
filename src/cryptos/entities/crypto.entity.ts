import { UserCrypto } from 'src/user-cryptos/entities/user-crypto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('cryptos')
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cmcId: number;

  @Column({ unique: true })
  symbol: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => UserCrypto, (uc) => uc.crypto)
  userCryptos: UserCrypto[];
}
