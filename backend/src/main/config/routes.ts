import { type Express, Router } from 'express';
import { readdirSync } from 'node:fs';

export default (app: Express): void => {
  const router = Router();

  app.use('/', router);

  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
}