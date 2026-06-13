import dotenv from 'dotenv';
import path from 'node:path';
import { createFetchServer, loadConfig } from 'uv-core';
import { adminRoute, dashboardRoute, healthRoute } from './routes/app.routes.js';
import { loginRoute, logoutRoute, profileRoute } from './routes/auth.routes.js';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
loadConfig();

const routes = {
  'GET /health': healthRoute,
  'POST /api/auth/login': loginRoute,
  'POST /api/auth/logout': logoutRoute,
  'GET /api/profile': profileRoute,
  'GET /api/dashboard': dashboardRoute,
  'GET /api/admin': adminRoute,
};

const port = Number(process.env.PORT ?? 3000);
const server = await createFetchServer(routes, port);

console.info(`Stitchmate listening on http://localhost:${port}`);

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
