import type { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { noCache } from '../middlewares';
import swaggerConfig from '../docs';

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig));
};
