import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisModule } from 'nestjs-redis';

import { CacheService } from 'configs';

import { RedisConfig } from './configs/redis';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    RedisModule.register(RedisConfig),
    ProductModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
