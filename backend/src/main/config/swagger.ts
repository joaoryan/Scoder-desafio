import type { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { noCache } from '../middlewares';
import swaggerConfig from '../docs';
import { env } from './env';

export default (app: Express): void => {
  if (env.NODE_ENV !== 'production') {
    app.use('/docs', noCache, serve, setup(swaggerConfig));
  }
};
