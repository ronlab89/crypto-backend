import { Crypto } from 'src/cryptos/entities/crypto.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('price_history')
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Crypto, (crypto) => crypto.userCryptos)
  crypto: Crypto;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column('float')
  price: number;

  @Column('float')
  market_cap: number;

  @Column('float')
  volume24h: number;

  @Column('float')
  percent_change_24h: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
