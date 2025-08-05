import { IsNumber, IsString } from 'class-validator';

export class SaveHistoryDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  cryptoId: number;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  price: number;

  @IsNumber()
  market_cap: number;

  @IsNumber()
  volume24h: number;

  @IsNumber()
  percent_change_24h: number;
}
