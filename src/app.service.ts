import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Crypto Investment </br> Server running on port: ${process.env.PORT ?? 4000} 🚀`;
  }
}
