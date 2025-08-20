"use client"

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/auth-modal';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });

  // Redirect authenticated users
  useEffect(() => {
    if (!isLoading && user) {
      if (user.userType === 'instructor') {
        router.push('/dashboard');
      } else {
        router.push('/chat'); // or wherever learners should go
      }
    }
  }, [user, isLoading, router]);

  // Don't render anything while checking auth or if user is authenticated
  if (isLoading || user) {
    return null;
  }

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const switchAuthMode = () => {
    setAuthModal(prev => ({ 
      ...prev, 
      mode: prev.mode === 'login' ? 'signup' : 'login' 
    }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Smooth diagonal gradient background - matching the original mint to lavender blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-100 to-purple-200"></div>
      
      {/* Curved diagonal overlay for the smooth transition effect */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9af9bbff" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#b6a5faff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <path d="M0,0 L1200,0 L1200,400 Q600,500 0,400 Z" fill="url(#diagonalGradient)"/>
          <path d="M0,400 Q600,500 1200,400 L1200,800 Q600,600 0,800 Z" fill="url(#diagonalGradient)" fillOpacity="0.7"/>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center"></div>
          <span className="text-xl font-semibold text-purple-600">Learning Middleware</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 bg-green-200 text-green-800 rounded-full font-medium border border-green-300 hover:bg-green-300 transition-all duration-200 shadow-sm"
          >
            Log In
          </button>
          <button 
            onClick={() => openAuthModal('signup')}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content Container - Better vertical centering */}
      <div className="relative z-20 flex flex-col justify-center items-start h-full px-6 pb-20">
        
        {/* Top Text Section - Improved spacing and positioning */}
        <div className="mb-12 max-w-5xl">
          <h1 className="text-6xl font-bold text-purple-800 leading-[1.1] tracking-tight">
            Turn your learners' outcomes into{' '}
            <span className="relative inline-block bg-gradient-to-r from-emerald-100 via-emerald-50 to-purple-100 px-3 py-1 rounded-lg shadow-sm backdrop-blur-sm border border-emerald-200/50">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                adaptive learning
              </span>
            </span>{' '}
            experiences in{' '}
            <span className="relative inline-block bg-gradient-to-r from-emerald-100 via-emerald-50 to-purple-100 px-3 py-1 rounded-lg shadow-sm backdrop-blur-sm border border-emerald-200/50">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                minutes
              </span>
            </span>{' '}
            not hours.
          </h1>
        </div>

        {/* Buttons section without divider background */}
        <div className="w-full my-8 relative flex justify-between items-center px-8">
          <Link href='/dashboard'>
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-300 text-purple-800 font-semibold rounded-full hover:bg-purple-400 transition-all duration-200 shadow-md">
            For Tutors <ArrowUpRight size={18} strokeWidth={2} />
          </button>
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-300 text-green-800 font-semibold rounded-full hover:bg-green-400 transition-all duration-200 shadow-md">
            For Learners <ArrowUpRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Bottom Text Section - Aligned to the right */}
        <div className="mb-20 mt-12 max-w-5xl ml-auto">
          <h2 className="text-6xl font-bold text-green-700 leading-[1.1] tracking-tight text-right">
            Learn your way,{' '}
            <span className="relative inline-block">
              <span className="bg-transparent border-2 border-dashed border-green-600 px-3 py-0 rounded-full">
                at your pace
              </span>
            </span>{' '}
            with content that{' '}
            <span className="relative inline-block">
              <span className="bg-transparent border-2 border-dashed border-green-600 px-3 py-0 rounded-full">
                adapts
              </span>
            </span>{' '}
            to you.
          </h2>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
        onSwitchMode={switchAuthMode}
      />
    </div>
  );
};

export default LandingPage;