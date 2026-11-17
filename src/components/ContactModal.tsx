import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Send, X } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

const STUDIO_EMAIL = 'jack@3dcreator.studio';

export function ContactModal({
  isOpen,
  onClose,
  defaultSubject = '',
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICES[0].name);
  const [message, setMessage] = useState(defaultSubject);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultSubject) {
      setMessage(defaultSubject);
    }
  }, [defaultSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[32px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-1">
                  Start a project
                </p>
                <h3
                  id="contact-modal-title"
                  className="hero-heading font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none"
                >
                  Let&rsquo;s Talk
                </h3>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close contact dialog"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#D7E2EA]" />
                </div>
                <h4 className="text-xl uppercase font-medium tracking-wide">
                  Inquiry Sent
                </h4>
                <p className="text-sm text-[#D7E2EA]/75 max-w-sm leading-relaxed font-light">
                  Thanks, {name}. Your brief for {service} is logged — Jack
                  typically replies within one business day at {email}.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-2 rounded-full border-2 border-[#D7E2EA] px-8 py-2.5 text-xs font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Your Name
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="rounded-xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Email
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="rounded-xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Focus Area
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((item) => {
                      const active = service === item.name;
                      return (
                        <button
                          key={item.number}
                          type="button"
                          onClick={() => setService(item.name)}
                          className={`px-3.5 py-2 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#D7E2EA] text-[#0C0C0C] font-medium'
                              : 'border border-[#D7E2EA]/25 text-[#D7E2EA]/80 hover:border-[#D7E2EA]/60'
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                  Project Brief
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your timeline, visual goals, or deliverables..."
                    className="rounded-xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] resize-none"
                  />
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 text-xs text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors cursor-pointer py-2"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copied ? 'Copied email' : STUDIO_EMAIL}</span>
                  </button>

                  <button
                    type="submit"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs uppercase tracking-widest font-medium text-white cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
