import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import hash from 'object-hash';
@Injectable()
export class AppGuard {
  constructor(private redisService: RedisService) {
    this.redisService = redisService;
  }

  private redisClient = this.redisService.getClient('session');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const message = context.getArgByIndex(0);
    const hashedMessage = hash(message.body);
    if (await this.redisClient.get(hashedMessage)) {
      Logger.log('You shall not pass!', 'Guard', false);
      return false;
    }
    this.redisClient.set(hashedMessage, 'true', 'ex', 10 * 60);
    Logger.log('You are free to go :)', 'Guard', false);
    return true;
  }
}
