import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello hhhhhhh!';
  }

  getHelloAgain() {
    return 'Hello World Again!';
  }
}
