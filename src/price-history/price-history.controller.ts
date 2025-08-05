import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SaveHistoryDto } from './dto/save-history.dto';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHistory(
    @Query('cryptoId') cryptoId: number,
    @Query('userId') userId: number,
  ) {
    return this.priceHistoryService.getHistory(cryptoId, userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async saveHistoryBatch(@Body() histories: SaveHistoryDto[]) {
    return this.priceHistoryService.saveHistoryBatch(histories);
  }
}
