
import React from 'react';
import { SocialIcons } from '../ui/SocialIcons';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Logo = () => (
  <div className="text-white text-center">
    <h1 className="text-5xl font-bold tracking-wider">التراث</h1>
    <span className="text-lg tracking-widest">Academy</span>
  </div>
);

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="relative bg-purple-700 h-64 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-teal-500/80 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-16 right-0 w-48 h-48 bg-teal-400/70 rounded-full filter blur-lg"></div>
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'ellipse(80% 100% at 50% 100%)' }}></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 -mt-16 z-10">
        {children}
      </main>

      <footer className="py-8">
        <SocialIcons />
      </footer>
    </div>
  );
};
