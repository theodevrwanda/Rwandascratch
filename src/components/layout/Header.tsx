import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, Code, LogIn, MessageCircle } from 'lucide-react'; // Import MessageCircle icon
import { LoginModal } from '@/components/auth/LoginModal';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Chat', href: '/chat', isMobileOnly: true }, // Add the Chat link here
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { userData } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-gradient-primary p-2 rounded-xl">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient">RwandaScratch</span>
              <p className="text-xs text-muted-foreground -mt-1">Tech Innovation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation
              .filter(item => !item.isMobileOnly) // Filter out mobile-only links for desktop
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link to="/request-website">Request Website</Link>
            </Button>
            {userData ? (
              <UserMenu />
            ) : (
              <LoginModal>
                <Button variant="hero" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </LoginModal>
            )}
            <Button variant="hero" size="sm" asChild>
                <Link to="/chat">
                  <MessageCircle className="h-4 w-4" />
                </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg rounded-lg mt-2 border border-border/50 shadow-xl">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/request-website">Request Website</Link>
                </Button>
                {userData ? (
                  <div className="flex items-center space-x-2 p-2">
                    <UserMenu />
                    <span className="text-sm">{userData.displayName}</span>
                  </div>
                ) : (
                  <LoginModal>
                    <Button variant="hero" size="sm" className="w-full">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </LoginModal>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}