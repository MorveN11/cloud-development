import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/login', label: 'Iniciar Sesión' },
    { href: '/register', label: 'Registrarse' },
  ];
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="custom-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
              AltaConnect
            </Link>
          </div>

          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group relative rounded-lg px-4 py-2 font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
              >
                {link.label}
                <span className="absolute right-4 bottom-0 left-4 h-0.5 scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-200 group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="rotate-180 transform transition-transform duration-200" />
              ) : (
                <Menu className="transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="space-y-1 border-t border-border/30 bg-accent/30 px-4 pt-2 pb-3 backdrop-blur-sm">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className="block transform rounded-lg px-4 py-3 font-medium text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-accent hover:text-foreground"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none',
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
