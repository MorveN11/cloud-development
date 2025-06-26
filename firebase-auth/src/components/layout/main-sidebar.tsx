import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import type { User } from '@/types/auth.types';

import { Home, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface Props {
  user: User;
}

export function MainSidebar({ user }: Props) {
  const location = useLocation();
  const { handleLogout } = useAuthActions();

  const navigationItems = [{ icon: Home, label: 'Inicio', path: '/feed', isActive: location.pathname === '/feed' }];

  const secondaryItems = [
    { icon: UserIcon, label: 'Perfil', path: '/user-profile', isActive: location.pathname === '/user-profile' },
  ];

  return (
    <Card className="sticky top-6 h-fit w-72 p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={''} alt={user.displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{user.displayName}</h3>
            <p className="truncate text-xs text-muted-foreground">{'Miembro de AltaConnect'}</p>
          </div>
        </div>

        <Separator />

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={item.isActive ? 'default' : 'ghost'}
              className="w-full justify-start gap-3"
              asChild
            >
              <Link to={item.path}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <Separator />

        <nav className="space-y-1">
          {secondaryItems.map((item) => (
            <Button
              key={item.path}
              variant={item.isActive ? 'default' : 'ghost'}
              className="w-full justify-start gap-3"
              asChild
            >
              <Link to={item.path}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <Separator />

        <Button variant="outline" className="w-full justify-start gap-3" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </Card>
  );
}
