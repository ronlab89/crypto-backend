import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoinmarketService } from './coinmarket.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { QuoteDto } from './dto/quote.dto';

@Controller('coinmarket')
export class CoinmarketController {
  constructor(private readonly cmcService: CoinmarketService) {}

  @UseGuards(AuthGuard)
  @Get('map')
  getCryptoMap() {
    return this.cmcService.getAllCryptosForSelector();
  }

  @HttpCode(HttpStatus.OK)
  @Post('quote')
  @UseGuards(AuthGuard)
  getQuote(@Body() body: QuoteDto) {
    return this.cmcService.getQuotesByCmcIds(
      body.id ?? '',
      body.convert ?? 'USD',
    );
  }

  @Get('public/top')
  getTopCryptos(@Query('limit') limit = 10, @Query('convert') convert = 'USD') {
    return this.cmcService.getTopCryptosPublic(+limit, convert);
  }
}
