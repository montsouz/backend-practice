import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RedisModule } from 'nestjs-redis';
import { RedisClient } from 'redis';
import request from 'supertest';

import { RedisConfigTest, RedisClientOpts } from '../src/configs/redis';
import { ProductModule } from '../src/modules/product/product.module';

describe('Product', () => {
  let app: INestApplication;
  const redisClient = new RedisClient(RedisClientOpts);
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule, RedisModule.register(RedisConfigTest)],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`POST/ an item with a body and it should work`, async () => {
    await request(app.getHttpServer())
      .post('/product')
      .send({ abacaxi: 'abacaxi' })
      .expect(HttpStatus.CREATED);
  });

  it(`POST/ an item with THE SAME body and it should NOT work`, async () => {
    await request(app.getHttpServer())
      .post('/product')
      .send({ abacaxi: 'abacaxi' })
      .expect(HttpStatus.FORBIDDEN);
  });

  it(`POST/ an item with some deferent body and it should work again`, async () => {
    await request(app.getHttpServer())
      .post('/product')
      .send({ abacaxi: 'apple' })
      .expect(HttpStatus.CREATED);
  });

  it(`POST/ no item at all ! And It should reject`, async () => {
    await request(app.getHttpServer())
      .post('/product')
      .send(null)
      .expect(HttpStatus.FORBIDDEN);
  });

  afterAll(async () => {
    await redisClient.flushdb();
    await app.close();
  });
});
