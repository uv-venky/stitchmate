import { withPublicRoute, optionalAuthenticateRequest, renderSidebar, escapeHtml } from 'uv-core';
import { serverTeams } from './teams.js';

export const homeRoute = withPublicRoute(async () => {
  return new Response(null, {
    status: 302,
    headers: { Location: '/login' },
  });
});

export const dashboardPageRoute = withPublicRoute(async (req) => {
  let auth = null;
  try {
    auth = await optionalAuthenticateRequest(req);
  } catch (err) {
    // Stale or invalid token
  }

  if (!auth) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/login?sourceUrl=/dashboard',
        'Set-Cookie': 'uv_access_token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
      },
    });
  }

  const { getUserTeams } = await import('uv-core');
  const teams = await getUserTeams(auth.user, serverTeams);

  const contentHtml = `
    <div style="animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
      <h1 style="font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 300; margin-bottom: 0.5rem; letter-spacing: -0.02em;">Stitchmate Dashboard</h1>
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Welcome back, ${escapeHtml(auth.user.displayName)}! You are logged in.</p>
      
      <div style="background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); padding: 2rem; border-radius: 12px; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);">
        <h3 style="font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-white);">Active User Session</h3>
        <pre style="margin-top: 1rem; color: #a5f3fc; font-family: monospace; font-size: 0.875rem; white-space: pre-wrap; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03);">${escapeHtml(JSON.stringify(auth.user, null, 2))}</pre>
      </div>
    </div>
  `;

  const html = renderSidebar({
    activeTeam: teams[0] ?? null,
    teams: teams,
    activePath: '/dashboard',
    user: auth.user,
    brandName: 'Stitchmate',
    contentHtml: contentHtml,
  });

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
});
