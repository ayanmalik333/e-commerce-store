import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail, Home } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Privacy Policy | Terra & Linen Atelier';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = 'Terra & Linen | Artisanal E-Commerce Store';
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Navigation Breadcrumb & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6E0D8]">
        <button
          id="privacy-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B6B54] hover:text-[#2C221E] transition-colors cursor-pointer group bg-[#F7F4EE] px-4 py-2 rounded-xl border border-[#E6E0D8]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#8C827A]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#2C221E]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#2C221E]">Privacy Policy</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5B6B54]/10 border border-[#5B6B54]/20 text-xs font-semibold text-[#5B6B54]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Protection & Privacy Standards</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#8C827A] font-light leading-relaxed max-w-2xl">
          At Terra & Linen Atelier, we value your trust and are committed to protecting your personal information with uncompromising transparency, security, and care.
        </p>
        <p className="text-[11px] text-[#8C827A]/80 font-mono">
          Last Updated: August 2026 • Applies to all website visitors and atelier clients worldwide.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm text-[#2C221E] font-light leading-relaxed">
        {/* Section 1 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <Lock className="w-5 h-5 text-[#5B6B54]" />
            <h2>1. Information We Collect</h2>
          </div>
          <p>
            When you browse our online store, register an account, or complete a purchase for our handcrafted home goods, we collect necessary personal data to process your requests:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#2C221E]/90">
            <li><strong>Personal Contact Information:</strong> Name, shipping address, email address, and phone number for shipping updates.</li>
            <li><strong>Transaction & Order History:</strong> Product details, order notes, payment confirmation status, and delivery records.</li>
            <li><strong>Technical & Analytical Data:</strong> IP address, browser type, device information, and site interaction cookies to optimize site performance.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <Eye className="w-5 h-5 text-[#5B6B54]" />
            <h2>2. How We Use Your Data</h2>
          </div>
          <p>
            We use your personal information solely for legitimate operational and customer service purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#2C221E]/90">
            <li>Fulfilling orders, preparing artisan dispatch, and issuing shipping notifications.</li>
            <li>Responding to customer concierge inquiries and custom request forms.</li>
            <li>Sending optional dispatch newsletters (only if explicitly opted-in, with instant 1-click unsubscribe).</li>
            <li>Ensuring fraud prevention, network security, and compliance with EU/Global data regulations.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <ShieldCheck className="w-5 h-5 text-[#5B6B54]" />
            <h2>3. Payment Protection & Strict No-Selling Policy</h2>
          </div>
          <p>
            We adhere to a strict ethical standard regarding client data. <strong>We NEVER sell, rent, or trade your personal information or email address to third-party advertisers.</strong>
          </p>
          <p>
            All online transactions are encrypted via 256-bit SSL protocols. Payment credentials are handled through PCI-DSS compliant secure gateways and are never stored directly on our servers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <FileText className="w-5 h-5 text-[#5B6B54]" />
            <h2>4. Your Rights & Choices</h2>
          </div>
          <p>
            Under GDPR and international privacy legislation, you maintain full control over your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#2C221E]/90">
            <li><strong>Right to Access & Copy:</strong> Request a full report of the personal data we store regarding your account.</li>
            <li><strong>Right to Rectification or Deletion:</strong> Request immediate correction or total erasure of your personal data from our systems.</li>
            <li><strong>Cookie Preferences:</strong> Control or disable non-essential cookies directly within your browser settings.</li>
          </ul>
        </section>

        {/* Contact Banner */}
        <div className="bg-[#2C221E] text-[#FDFBF7] p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-[#A2B899] font-serif font-bold text-base">
            <Mail className="w-5 h-5" />
            <h3>Privacy Questions or Data Erasure Requests?</h3>
          </div>
          <p className="text-xs text-[#E6E0D8]/80 leading-relaxed max-w-xl">
            If you have questions regarding this Privacy Policy or wish to exercise your data privacy rights, please reach out to our dedicated Data Protection Concierge.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              id="privacy-contact-concierge-btn"
              onClick={() => setCurrentPage('contact')}
              className="px-5 py-2.5 bg-[#5B6B54] hover:bg-[#6C7E64] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Contact Privacy Concierge
            </button>
            <span className="text-xs font-mono text-[#E6E0D8]/60">privacy@terra-linen.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
