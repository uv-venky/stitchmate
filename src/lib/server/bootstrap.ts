import dotenv from 'dotenv';
import path from 'node:path';
import { loadConfig } from 'uv-core/config';
import { addDataSources } from 'uv-core/ds';
import { setActionRegistry } from 'uv-core/actions';
import { ACTION_ACCESS_ROLES, ACTIONS } from './actions';
import { APP_DATASOURCES } from './ds/defs/app/index';

let initialized = false;

export function ensureServerInitialized(): void {
  if (initialized) {
    return;
  }

  dotenv.config();
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  loadConfig();
  addDataSources(APP_DATASOURCES);
  setActionRegistry({ ACTIONS, ACTION_ACCESS_ROLES });
  initialized = true;
}
