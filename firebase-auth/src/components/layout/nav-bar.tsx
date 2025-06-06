import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context';

import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  const noAuthLinks = [
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Register' },
  ];

  const authLinks = [{ href: '/dashboard', label: 'Dashboard' }];

  const navLinks = [{ href: '/', label: 'Home' }, ...(isAuthenticated ? authLinks : noAuthLinks)];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/95 text-white backdrop-blur-md">
      <div className="custom-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 hover:from-blue-300 hover:to-purple-400"
            >
              Firebase Auth
            </a>
          </div>

          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-4 py-2 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white"
              >
                {link.label}
                <span className="absolute right-4 bottom-0 left-4 h-0.5 scale-x-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-transform duration-200 group-hover:scale-x-100"></span>
              </a>
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
        <div className="space-y-1 border-t border-slate-700/30 bg-slate-800/30 px-4 pt-2 pb-3 backdrop-blur-sm">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="block transform rounded-lg px-4 py-3 font-medium text-slate-300 transition-all duration-200 hover:translate-x-1 hover:bg-slate-700/50 hover:text-white"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none',
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
