import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypto } from './entities/crypto.entity';
import { CoinmarketService } from 'src/coinmarket/coinmarket.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CryptosService {
  constructor(
    @InjectRepository(Crypto)
    private readonly cryptoRepo: Repository<Crypto>,
    private readonly coinmarketService: CoinmarketService,
  ) {}

  async saveOrUpdateCryptosFromAPI(): Promise<void> {
    const cryptos = await this.coinmarketService.getAllCryptosForSelector();

    for (const data of cryptos) {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');

      await this.cryptoRepo.upsert(
        {
          cmcId: data.id,
          symbol: data.symbol,
          name: data.name,
          slug,
        },
        ['cmcId'], // evita duplicados por cmcId
      );
    }
  }

  findAll(): Promise<Crypto[]> {
    return this.cryptoRepo.find();
  }

  @Cron('0 2 * * *') // todos los días a las 2:00 AM
  async handleDailyCryptoSync() {
    await this.saveOrUpdateCryptosFromAPI();
    console.log('✅ Cryptos actualizadas desde CoinMarketCap');
  }
}
