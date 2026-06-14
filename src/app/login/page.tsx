import { Suspense } from 'react';
import LoginFormClient from './login-form-client';

export default function LoginPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh' }} />}>
      <LoginFormClient />
    </Suspense>
  );
}
