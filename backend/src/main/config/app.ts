import express from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

import setupLimiter from './rate-limit';

const app = express();

setupLimiter(app);
setupMiddlewares(app);
setupRoutes(app);

export { app };