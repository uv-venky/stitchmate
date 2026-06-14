import type { AuthenticatedRequest } from 'uv-core/auth';
import type { PgPoolClient } from 'uv-core/database';
import { getConfig } from 'uv-core/config';

async function getEnvironmentAction(_client: PgPoolClient, _session: AuthenticatedRequest) {
  return {
    APP_ID: getConfig().appId,
  };
}

async function getAppConfigForDevtoolsAction(_client: PgPoolClient, _session: AuthenticatedRequest) {
  const config = getConfig();
  const url = new URL(config.dbUrl);
  url.password = '*****';

  return {
    appId: config.appId,
    dbUrl: url.toString(),
    jwtExpiresIn: config.jwtExpiresIn,
    migrationsDir: config.migrationsDir,
  };
}

export const ACTIONS = {
  getEnvironment: getEnvironmentAction,
  getAppConfigForDevtools: getAppConfigForDevtoolsAction,
};

export const ACTION_ACCESS_ROLES = {
  getEnvironment: ['all_users'],
  getAppConfigForDevtools: ['all_users'],
};
