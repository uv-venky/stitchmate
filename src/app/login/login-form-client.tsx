'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceUrl = searchParams.get('sourceUrl') ?? '/app/uv-users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();

      if (!response.ok || payload.status === 'ERROR') {
        throw new Error(payload.message ?? 'Invalid credentials');
      }

      document.cookie = `uv_access_token=${encodeURIComponent(payload.accessToken)}; path=/; max-age=3600; SameSite=Lax`;
      router.push(sourceUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '420px', display: 'grid', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Stitchmate Sign In</h1>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.75rem' }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={5}
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.75rem' }}
          />
        </label>
        {error ? <p style={{ color: '#ef4444' }}>{error}</p> : null}
        <button type="submit" disabled={loading} style={{ padding: '0.75rem 1rem' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
