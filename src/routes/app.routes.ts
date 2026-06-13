import { withAuthRoute, withPublicRoute, withRoleRoute } from 'uv-core';

export const healthRoute = withPublicRoute(async () => {
  return Response.json({ status: 'ok', app: 'stitchmate' });
});

export const dashboardRoute = withAuthRoute(async (_req, auth) => {
  return Response.json({
    message: 'Stitchmate dashboard',
    userName: auth.user.userName,
    roles: auth.user.roles,
  });
});

export const adminRoute = withRoleRoute(['admin', 'root'], async () => {
  return Response.json({ message: 'Stitchmate admin area' });
});
