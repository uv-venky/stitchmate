import { createLoginRoute } from 'uv-core/auth/routes';
import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(createLoginRoute());

export const POST = handler;
export const runtime = 'nodejs';
