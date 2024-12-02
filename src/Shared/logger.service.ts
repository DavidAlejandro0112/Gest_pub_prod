import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomLogger {
  private logger = new Logger('CustomLogger');

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}
