import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingChat } from '@/components/FloatingChat';
import { StarCursor } from '@/components/StarCursor';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Auto scroll to top on route change
  useScrollToTop();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 lg:pt-20" data-aos="fade-up" data-aos-duration="800">
        {children}
      </main>
      <Footer />
      <FloatingChat />
      <StarCursor />
    </div>
  );
}