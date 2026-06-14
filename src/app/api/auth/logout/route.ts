import { createLogoutRoute } from 'uv-core/auth/routes';
import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(createLogoutRoute());

export const POST = handler;
export const runtime = 'nodejs';
