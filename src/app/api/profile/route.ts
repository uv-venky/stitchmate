import { createProfileRoute } from 'uv-core/auth/routes';
import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(createProfileRoute());

export const GET = handler;
export const runtime = 'nodejs';
