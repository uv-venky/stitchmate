import {
  login,
  logout,
  readJsonBody,
  withAuthRoute,
  withPublicRoute,
} from 'uv-core';

export const loginRoute = withPublicRoute(async (req) => {
  const body = await readJsonBody<{ email: string; password: string }>(req);
  return Response.json(await login(body));
});

export const logoutRoute = withAuthRoute(async (req) => {
  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  await logout(token);
  return new Response(null, { status: 204 });
});

export const profileRoute = withAuthRoute(async (_req, auth) => {
  return Response.json({ user: auth.user });
});
