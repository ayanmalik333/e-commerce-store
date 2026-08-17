import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, Key, ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const ManagerAuthPage: React.FC = () => {
  const { login, continueDemoMode, setCurrentPage } = useStore();
  const [email, setEmail] = useState('admin@terra-linen.com');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleManagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email.trim() || 'admin@terra-linen.com', 'admin');
    setCurrentPage('admin');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2C221E]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5B6B54]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 mb-6">
        <button
          id="manager-back-store-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-1.5 text-xs text-[#8C827A] hover:text-[#2C221E] transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Customer Store</span>
        </button>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-7 h-7 text-[#5B6B54]" />
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C221E]">
            Site Manager Portal
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#8C827A] font-medium">
          Authorized Atelier Staff & Store Administrators Only
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-[#2C221E] text-[#FDFBF7] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#2C221E] space-y-6">
          
          {/* Warning Banner */}
          <div className="bg-[#FDFBF7]/10 p-3.5 rounded-2xl border border-[#E6E0D8]/15 flex items-start gap-3 text-xs">
            <ShieldAlert className="w-5 h-5 text-[#A2B899] flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[#E6E0D8]/90">
              <span className="font-bold text-[#FDFBF7] block">Restricted Security Gateway</span>
              <p className="text-[11px] leading-relaxed text-[#E6E0D8]/75">
                Unauthorized access attempts are logged. For development testing without a live database, use the demo bypass option below.
              </p>
            </div>
          </div>

          <form onSubmit={handleManagerSubmit} className="space-y-4">
            {/* Admin Email */}
            <div>
              <label className="block text-xs font-medium text-[#E6E0D8] mb-1">
                Site Manager ID / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A2B899] absolute left-3 top-3" />
                <input
                  id="manager-auth-email"
                  type="email"
                  required
                  placeholder="admin@terra-linen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FDFBF7]/10 border border-[#E6E0D8]/20 rounded-xl text-[#FDFBF7] placeholder-[#E6E0D8]/40 focus:outline-none focus:border-[#A2B899] transition-colors"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div>
              <label className="block text-xs font-medium text-[#E6E0D8] mb-1">
                Manager Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A2B899] absolute left-3 top-3" />
                <input
                  id="manager-auth-password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FDFBF7]/10 border border-[#E6E0D8]/20 rounded-xl text-[#FDFBF7] placeholder-[#E6E0D8]/40 focus:outline-none focus:border-[#A2B899] transition-colors"
                />
              </div>
            </div>

            {/* Secret Passcode (Optional Security Touch) */}
            <div>
              <label className="block text-xs font-medium text-[#E6E0D8] mb-1">
                Atelier Security Passcode
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#A2B899] absolute left-3 top-3" />
                <input
                  id="manager-auth-passcode"
                  type="text"
                  placeholder="Default Demo Passcode: 123456"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FDFBF7]/10 border border-[#E6E0D8]/20 rounded-xl text-[#FDFBF7] placeholder-[#E6E0D8]/40 focus:outline-none focus:border-[#A2B899] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="manager-auth-submit-btn"
              type="submit"
              className="w-full py-3 bg-[#5B6B54] hover:bg-[#475442] text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Authenticate & Access Manager Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6E0D8]/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#2C221E] px-3 text-[#A2B899] font-medium tracking-wider text-[11px]">
                Backend Unconnected Bypass
              </span>
            </div>
          </div>

          {/* Demo Bypass Requirement */}
          <div className="space-y-2">
            <button
              id="manager-auth-continue-demo-btn"
              type="button"
              onClick={() => continueDemoMode('admin')}
              className="w-full py-3 bg-[#A2B899] hover:bg-[#8CA283] text-[#2C221E] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#2C221E]" />
              <span>Continue to Demo Mode (Site Manager)</span>
            </button>
            <p className="text-[11px] text-center text-[#E6E0D8]/70 leading-normal">
              Since no external database is connected yet, click above to instantly enter the Site Manager Operations Dashboard in demo mode.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
