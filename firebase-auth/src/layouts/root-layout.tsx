import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className={cn('font-sans antialiased', import.meta.env.DEV ? 'debug-screens' : '')}>
      <Outlet />
      <Toaster closeButton expand position="top-right" duration={5000} />
    </div>
  );
}
