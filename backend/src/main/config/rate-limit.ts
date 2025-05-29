import type { Express } from 'express';
import { limiter } from '../middlewares';

export default (app: Express): void => {
  app.use(limiter);
};
