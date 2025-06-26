import { type ReactNode } from 'react';

import { EmailLogo } from '@/assets/logos/email-logo';
import { GithubLogo } from '@/assets/logos/github-logo';
import { GoogleLogo } from '@/assets/logos/google-logo';
import { cn } from '@/lib/utils';
import { authProviderInfo, type AuthProviderType } from '@/providers/auth.providers';

interface Props {
  providerId: AuthProviderType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProviderIcon({ providerId, className, size = 'md' }: Props) {
  const provider = authProviderInfo[providerId];

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconProps = {
    className: cn(sizeClasses[size], className),
  };

  const iconMap: Record<string, ReactNode> = {
    'google.com': <GoogleLogo {...iconProps} />,
    'github.com': <GithubLogo {...iconProps} />,
    password: <EmailLogo {...iconProps} />,
  };

  const icon = iconMap[provider.providerId];

  return <>{icon}</>;
}
