'use client';

import { BaseAppProvider } from '@/components/sidebar/app-provider-base';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <BaseAppProvider APP_NAME="Stitchmate" APP_DESCRIPTION="Stitchmate Application">
      {children}
    </BaseAppProvider>
  );
}
