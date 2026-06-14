import { createNextHandler } from '@/lib/server/next-route';

const handler = createNextHandler(async () => {
  return Response.json({ status: 'ok', app: 'stitchmate' });
});

export const GET = handler;
export const runtime = 'nodejs';
