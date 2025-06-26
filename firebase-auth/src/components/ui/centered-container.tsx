import { type ReactNode } from 'react';

interface CenteredContainerProps {
  children: ReactNode;
  fullScreen?: boolean;
  className?: string;
}

export function CenteredContainer({ children, fullScreen = false, className = '' }: CenteredContainerProps) {
  const baseClasses = 'flex items-center justify-center';
  const screenClasses = fullScreen ? 'custom-container h-screen' : 'p-8';

  return <div className={`${baseClasses} ${screenClasses} ${className}`}>{children}</div>;
}
