import dotenv from 'dotenv';
import path from 'node:path';
import { executeQuery, loadConfig } from 'uv-core';

dotenv.config();
loadConfig();

async function run() {
  try {
    await executeQuery(`
      INSERT INTO sm.uv_apps (app_id, name, full_url, icon, created_at, created_by, updated_at, updated_by)
      VALUES ($1, $2, $3, $4, now(), 'system', now(), 'system')
      ON CONFLICT (app_id) DO UPDATE 
      SET name = EXCLUDED.name, full_url = EXCLUDED.full_url, icon = EXCLUDED.icon, updated_at = now();
    `, ['metro-one', 'Metro One CC', 'http://localhost:3006', 'admin']);
    console.log('App inserted successfully!');
  } catch (err) {
    console.error('Error inserting app:', err);
  } finally {
    process.exit(0);
  }
}

run();
