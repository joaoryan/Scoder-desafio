import { createDocument } from 'zod-openapi';
import paths from './paths';

export default createDocument({
  openapi: '3.1.0',
  info: {
    title: 'SURISTORE',
    description: 'Official backend documentation.',
    version: '1.0.0'
  },
  tags: [
    { name: 'Products', description: 'Endpoints for products' }
  ],
  paths
});
