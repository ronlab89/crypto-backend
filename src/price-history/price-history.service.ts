import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Repository } from 'typeorm';
import { Crypto } from 'src/cryptos/entities/crypto.entity';
import { User } from 'src/users/entities/user.entity';

interface SaveHistoryDto {
  userId: number;
  cryptoId: number;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  volume24h: number;
  percent_change_24h: number;
}

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly historyRepo: Repository<PriceHistory>,
    @InjectRepository(Crypto)
    private readonly cryptoRepo: Repository<Crypto>,
  ) {}

  async saveHistoryBatch(histories: SaveHistoryDto[]): Promise<PriceHistory[]> {
    const savedHistories: PriceHistory[] = [];

    for (const item of histories) {
      const {
        userId,
        cryptoId,
        name,
        symbol,
        price,
        market_cap,
        volume24h,
        percent_change_24h,
      } = item;

      const crypto = await this.cryptoRepo.findOneBy({ id: cryptoId });
      const user = await this.historyRepo.manager
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (!user || !crypto) {
        continue;
      }

      const history = this.historyRepo.create({
        user,
        crypto,
        name,
        symbol,
        price,
        market_cap,
        volume24h,
        percent_change_24h,
      });

      const saved = await this.historyRepo.save(history);
      savedHistories.push(saved);
    }

    return savedHistories;
  }

  async getHistory(cryptoId: number, userId: number): Promise<PriceHistory[]> {
    return this.historyRepo.find({
      where: {
        crypto: { id: cryptoId },
        user: { id: userId },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
