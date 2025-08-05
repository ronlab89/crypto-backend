import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCrypto } from './entities/user-crypto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Crypto } from 'src/cryptos/entities/crypto.entity';

@Injectable()
export class UserCryptosService {
  constructor(
    @InjectRepository(UserCrypto)
    private readonly userCryptoRepo: Repository<UserCrypto>,

    @InjectRepository(Crypto)
    private readonly cryptoRepo: Repository<Crypto>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addMultipleCryptosToUser(userId: number, cryptoIds: number[]) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const cryptos = await this.cryptoRepo.findByIds(cryptoIds);
    if (cryptos.length === 0)
      throw new NotFoundException('No valid cryptos found');

    const existingRelations = await this.userCryptoRepo.find({
      where: { user: { id: userId } },
      relations: ['crypto'],
    });

    const existingCryptoIds = existingRelations.map((rel) => rel.crypto.id);

    const newRelations = cryptos
      .filter((c) => !existingCryptoIds.includes(c.id))
      .map((crypto) => this.userCryptoRepo.create({ user, crypto }));

    await this.userCryptoRepo.save(newRelations);
    return { message: 'Crypto monedas agregadas correctamente' };
  }

  async getCryptosByUser(userId: number) {
    const userCryptos = await this.userCryptoRepo.find({
      where: { user: { id: userId } },
      relations: ['crypto'],
    });

    return userCryptos.map((uc) => ({
      id: uc.crypto.id,
      cmcId: uc.crypto.cmcId,
      name: uc.crypto.name,
      symbol: uc.crypto.symbol,
      slug: uc.crypto.slug,
    }));
  }
}
