import { Controller, Get, UseGuards } from '@nestjs/common';
import { CryptosService } from './cryptos.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('cryptos')
export class CryptosController {
  constructor(private readonly service: CryptosService) {}

  @Get('sync')
  async sync() {
    await this.service.saveOrUpdateCryptosFromAPI();
    return { message: 'Cryptos sincronizados correctamente' };
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
