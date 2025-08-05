import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserCryptosService } from './user-cryptos.service';
import { AddUserCryptoDto } from './dto/add-user-crypto.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user-cryptos')
export class UserCryptosController {
  constructor(private readonly service: UserCryptosService) {}

  @UseGuards(AuthGuard)
  @Post()
  addMultiple(@Body() body: AddUserCryptoDto) {
    return this.service.addMultipleCryptosToUser(body.userId, body.cryptoIds);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  getUserCryptos(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getCryptosByUser(userId);
  }
}
