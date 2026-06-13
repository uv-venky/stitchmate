import { createAuthRoutes } from 'uv-core';

export { dashboardPageRoute, homeRoute } from './login.routes.js';

export const authRoutes = createAuthRoutes({
  loginPage: {
    title: 'Stitchmate',
    redirectUrl: '/dashboard',
    brandName: 'Stitchmate',
    googleAuthEnabled: true,
    ssoEnabled: true,
  },
});
