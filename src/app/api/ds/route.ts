import { createDataSourceRoute } from 'uv-core/ds';
import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(createDataSourceRoute());

export const POST = handler;
export const runtime = 'nodejs';
