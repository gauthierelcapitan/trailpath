import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: 'Welcome to trail-path-api lol go fuck you!',
    };
  }
}
