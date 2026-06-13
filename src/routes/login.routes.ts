import { withPublicRoute } from 'uv-core';

export const homeRoute = withPublicRoute(async () => {
  return new Response(null, {
    status: 302,
    headers: { Location: '/login' },
  });
});

function renderDashboardPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stitchmate Dashboard</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; }
    pre { background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; overflow: auto; }
    a, button { margin-right: 1rem; }
  </style>
</head>
<body>
  <h1>Stitchmate Dashboard</h1>
  <p id="status">Loading...</p>
  <pre id="data"></pre>
  <button type="button" id="logout">Sign out</button>
  <a href="/login">Back to login</a>
  <script>
    var tokenKey = 'uv_access_token';
    var token = localStorage.getItem(tokenKey);
    var statusEl = document.getElementById('status');
    var dataEl = document.getElementById('data');

    if (!token) {
      window.location.href = '/login?sourceUrl=/dashboard';
    } else {
      fetch('/api/dashboard', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Session expired');
          return response.json();
        })
        .then(function (data) {
          statusEl.textContent = 'Signed in as ' + data.userName;
          dataEl.textContent = JSON.stringify(data, null, 2);
        })
        .catch(function () {
          localStorage.removeItem(tokenKey);
          window.location.href = '/login?sourceUrl=/dashboard';
        });
    }

    document.getElementById('logout').addEventListener('click', function () {
      var token = localStorage.getItem(tokenKey);
      if (token) {
        fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + token }
        }).finally(function () {
          localStorage.removeItem(tokenKey);
          window.location.href = '/login';
        });
      } else {
        window.location.href = '/login';
      }
    });
  </script>
</body>
</html>`;
}

export const dashboardPageRoute = withPublicRoute(async () => {
  return new Response(renderDashboardPage(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
});
