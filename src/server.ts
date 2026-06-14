import dotenv from 'dotenv';
import path from 'node:path';
import { createFetchServer, loadConfig, createDataSourceRoute, addDataSources } from 'uv-core';
import { createCodegenPageRoutes, createCodegenRoutes } from 'uv-core/codegen';
import { adminRoute, dashboardRoute, healthRoute } from './routes/app.routes.js';
import { authRoutes, dashboardPageRoute, homeRoute } from './routes/auth.routes.js';
import { serverTeams } from './routes/teams.js';
import { APP_DATASOURCES } from './lib/server/ds/defs/app/index.js';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
loadConfig();

// Register all datasources
addDataSources(APP_DATASOURCES);

const routes = {
  'GET /': homeRoute,
  'GET /dashboard': dashboardPageRoute,
  'GET /health': healthRoute,
  ...authRoutes,
  'GET /api/dashboard': dashboardRoute,
  'GET /api/admin': adminRoute,
  'POST /api/ds': createDataSourceRoute(),
  ...createCodegenRoutes(),
  ...createCodegenPageRoutes(
    {
      brandName: 'Stitchmate',
      serverTeams,
      activePath: '/codegen',
      modules: [
        { value: 'app', label: 'App' },
        { value: 'admin', label: 'Admin' },
      ],
      subModules: [
        { value: 'config', label: 'Configuration' },
        { value: 'maintenance', label: 'Maintenance' },
      ],
      developmentOnly: true,
    },
    ['/admin/codegen'],
  ),
};

const port = Number(process.env.PORT ?? 3000);
const server = await createFetchServer(routes, port);

console.info(`Stitchmate listening on http://localhost:${port}`);
console.info(`Login page: http://localhost:${port}/login`);
console.info(`Codegen page: http://localhost:${port}/codegen`);

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
