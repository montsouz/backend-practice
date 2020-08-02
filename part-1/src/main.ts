// * eslint-disable @typescript-eslint/no-non-null-assertion */

import { Logger, InternalServerErrorException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { DOMAIN, PORT, RATE_LIMIT_MAX, NODE_ENV } from 'environments';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        max: RATE_LIMIT_MAX!, // limit each IP to 100 requests per windowMs
        message:
          '⚠️  Too many request created from this IP, please try again after an hour',
      }),
    );

    app.enableShutdownHooks();

    await app.listen(PORT!, '0.0.0.0');
    NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://${DOMAIN!}:${chalk
            .hex('#87e8de')
            .bold(`${PORT!}`)}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT!}`)}`,
          'Bootstrap',
          false,
        );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
