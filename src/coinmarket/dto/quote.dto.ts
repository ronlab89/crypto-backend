import { IsString } from 'class-validator';

export class QuoteDto {
  @IsString()
  id: string; // 1,6,4 o 6

  @IsString()
  convert?: string; // COP,USD,EUR
}
