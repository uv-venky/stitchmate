import { createActionRoute } from 'uv-core/actions';
import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(createActionRoute());

export const POST = handler;
export const runtime = 'nodejs';
