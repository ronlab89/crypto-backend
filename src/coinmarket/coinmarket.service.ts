/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { PriceHistoryService } from 'src/price-history/price-history.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoinmarketService {
  private readonly logger = new Logger(CoinmarketService.name);
  private readonly baseUrl = process.env.COINMARKET_API_URL;
  private readonly baseUrlProd = process.env.COINMARKET_API_URL_PROD;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  async getAllCryptosForSelector(): Promise<
    { id: number; name: string; symbol: string }[]
  > {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrlProd}/v1/cryptocurrency/map`, {
          params: {
            listing_status: 'active', // ✅ FILTRA SOLO ACTIVOS
          },
          headers: {
            'X-CMC_PRO_API_KEY': this.config.get('COINMARKET_API_KEY'),
          },
        }),
      );

      const allCryptos: { id: number; name: string; symbol: string }[] =
        data.data.map((crypto: any) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
        }));

      // ✅ Limitar para pruebas
      // return allCryptos.slice(0, 20);
      return allCryptos;
    } catch (error) {
      console.error('❌ Error fetching active cryptos from /map:', error);
      return [];
    }
  }

  async getQuotesByCmcIds(id: string, convert: string): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrlProd}/v2/cryptocurrency/quotes/latest`,
          {
            params: {
              id: id.trim(),
              convert: convert.trim(),
            },
            headers: {
              'X-CMC_PRO_API_KEY': this.config.get('COINMARKET_API_KEY'),
            },
          },
        ),
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching CoinMarketCap quotes', error);
      throw new InternalServerErrorException('Failed to fetch quotes');
    }
  }

  async getTopCryptosPublic(limit = 10, convert = 'USD'): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrlProd}/v1/cryptocurrency/listings/latest`,
        {
          params: { start: 1, limit, convert },
          headers: {
            'X-CMC_PRO_API_KEY': this.config.get('COINMARKET_API_KEY'),
          },
        },
      ),
    );
    return data;
  }

  // 🚨 Se ejecuta cada 10 minutos para todas las criptos activas por usuario
  @Cron('*/10 * * * *')
  async autoFetchAndSaveUserCryptos() {
    const users = await this.usersService.findAllWithCryptos();

    for (const user of users) {
      for (const uc of user.cryptos) {
        try {
          const { data } = await this.getQuotesByCmcIds(
            uc.crypto.cmcId.toString(),
            'USD,EUR,COP',
          );
          const price = data[uc.crypto.symbol];

          await this.priceHistoryService.saveHistoryBatch([
            {
              userId: user.id,
              cryptoId: uc.crypto.id,
              name: uc.crypto.name,
              symbol: uc.crypto.symbol,
              price: price.quote.USD.price,
              market_cap: price.quote.USD.market_cap,
              volume24h: price.quote.USD.volume_24h,
              percent_change_24h: price.quote.USD.percent_change_24h,
            },
          ]);
        } catch (err) {
          this.logger.error(
            `Error obteniendo historial de ${uc.crypto.symbol}, error: ${err}`,
          );
        }
      }
    }
  }
}
