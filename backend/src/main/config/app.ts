import express from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupLimiter from './rate-limit';
import setupSwagger from './swagger';

const app = express();

setupLimiter(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export { app };