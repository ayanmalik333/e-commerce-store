import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitInquiry, auth } = useStore();

  const [name, setName] = useState(auth.user?.name || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitInquiry({
      name,
      email,
      phone: phone || 'N/A',
      subject: subject || 'General Concierge Inquiry',
      message
    });

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 border border-[#E6E0D8] text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54] mb-2 block">
          Client Concierge & Trade Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] mb-2">
          Contact Terra & Linen
        </h1>
        <p className="text-xs sm:text-sm text-[#8C827A] font-light">
          Have a question about product care, custom pottery orders, trade pricing, or delivery tracking? Our atelier concierge is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0D8]">
            <MessageSquare className="w-5 h-5 text-[#5B6B54]" />
            <h2 className="font-serif text-xl font-bold text-[#2C221E]">
              Send an Inquiry
            </h2>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-[#FDFBF7] rounded-2xl border border-[#5B6B54]/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#5B6B54] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Inquiry Successfully Logged!
              </h3>
              <p className="text-xs text-[#8C827A] max-w-md mx-auto">
                Thank you, {name}. Your message has been saved to our Concierge Inquiry Log. An atelier representative will respond to {email} within 24 business hours.
              </p>
              <button
                id="contact-send-another-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                  setSubject('');
                }}
                className="px-6 py-2.5 bg-[#2C221E] text-[#FDFBF7] text-xs font-medium rounded-xl hover:bg-[#5B6B54] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Inquiry Subject *
                  </label>
                  <input
                    id="contact-subject-input"
                    type="text"
                    required
                    placeholder="e.g. Trade Order / Care Question"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Inquiry Message *
                </label>
                <textarea
                  id="contact-message-textarea"
                  required
                  rows={4}
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F7F4EE] p-6 rounded-3xl border border-[#E6E0D8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2C221E] border-b border-[#E6E0D8] pb-2">
              Atelier Showroom & Contact
            </h3>

            <div className="space-y-3 text-xs text-[#8C827A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#5B6B54] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C221E] block">Atelier Location:</strong>
                  148 Sintra Hills Way, Lisbon 1000-012, Portugal
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#5B6B54] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C221E] block">Email Assistance:</strong>
                  concierge@terra-linen.com
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#5B6B54] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C221E] block">Direct Line:</strong>
                  +351 21 890 4422
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#5B6B54] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C221E] block">Concierge Hours:</strong>
                  Monday – Friday: 09:00 – 18:00 WET
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E6E0D8] space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#2C221E]">
              Interior Designer & Trade Partnerships
            </h4>
            <p className="text-[#8C827A] leading-relaxed">
              We collaborate with boutique hotels, architectural firms, and interior stylists worldwide. For trade catalogs and custom pottery production runs, please select "Trade Inquiry" in the subject line above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
