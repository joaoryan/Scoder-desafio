import { app } from './config/app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`Server running in development mode at http://localhost:${env.PORT}`);
});