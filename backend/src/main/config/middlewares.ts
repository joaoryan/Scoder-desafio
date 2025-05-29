import type { Express } from 'express';
import { cors, noCache, bodyParserJson, bodyParserUrlEnconded } from '../middlewares';

export default (app: Express): void => {
  app.use(cors);
  app.use(noCache);
  app.use(bodyParserJson);
  app.use(bodyParserUrlEnconded);
};