import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, UserCheck, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthPage: React.FC = () => {
  const { login, continueDemoMode } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, 'customer');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Art */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B6B54]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2C221E]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 mb-8">
        <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2C221E]">
          TERRA & LINEN
        </span>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8C827A] font-medium">
          Artisanal Home & Slow Living Atelier
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-[#F7F4EE] py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-[#E6E0D8] space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-4">
            <h2 className="font-serif text-xl font-semibold text-[#2C221E]">
              {isRegister ? 'Create Account' : 'Sign In to Atelier'}
            </h2>
            <button
              id="auth-toggle-mode-btn"
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-[#5B6B54] hover:underline cursor-pointer"
            >
              {isRegister ? 'Existing User? Sign In' : 'New? Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-[#2C221E] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-[#2C221E] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-3 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{isRegister ? 'Register & Enter' : 'Sign In & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6E0D8]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#F7F4EE] px-3 text-[#8C827A] font-medium tracking-wider">
                Instant Access
              </span>
            </div>
          </div>

          {/* Prompt Requirement: Demo Bypass Feature */}
          <div className="space-y-2">
            <button
              id="auth-continue-demo-btn"
              onClick={() => continueDemoMode('customer')}
              className="w-full py-3 bg-[#5B6B54]/15 hover:bg-[#5B6B54] hover:text-white text-[#2C221E] border border-[#5B6B54]/30 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#5B6B54] hover:text-white" />
              <span>Continue to Demo Mode (Customer)</span>
            </button>
            <p className="text-[11px] text-center text-[#8C827A]">
              Bypasses authentication instantly to test products, cart, and order placement.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
