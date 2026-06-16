'use client';

// "Register Your Interest" — button + compact lead-capture popup. prototype5 ONLY.
// Mock: submit just shows a success state (no backend).
import { useEffect, useState } from 'react';
import { ChevronRight, X, Check, User, Mail, Phone, Sparkles } from 'lucide-react';

const INTENTS = ['Buy to live', 'Investment', 'Exploring'];
const EMPTY = { name: '', email: '', phone: '', intent: 'Investment' };

export default function RegisterInterest({ projectName }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setForm(EMPTY);
      setErrors({});
    }, 250);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = true;
    if (form.phone.replace(/\D/g, '').length < 7) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#8C6A57] px-4 py-3 text-sm font-semibold text-white hover:bg-[#74543F] transition-colors"
      >
        Register Your Interest
        <ChevronRight size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" onClick={close}>
          <div className="w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* compact bronze header */}
            <div className="relative bg-gradient-to-br from-[#8C6A57] to-[#5F4434] px-5 py-4 text-white">
              <button type="button" onClick={close} className="absolute right-3 top-3 rounded-full p-1 text-white/80 hover:bg-white/15">
                <X size={18} />
              </button>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <Sparkles size={16} />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight">
                    {done ? 'Thank you!' : 'Register Your Interest'}
                  </h3>
                  <p className="text-[11px] text-white/75">{projectName}</p>
                </div>
              </div>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-2 px-5 py-7 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F2EC] text-[#1F8A5B]">
                  <Check size={26} strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Request received</p>
                <p className="text-[13px] text-[#6B6B6B]">Our team will reach out shortly.</p>
                <button type="button" onClick={close} className="mt-2 rounded-lg bg-[#1A1A1A] px-5 py-2 text-[13px] font-semibold text-white hover:bg-black">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-2.5 p-5">
                <IconInput icon={User} error={errors.name} value={form.name} onChange={set('name')} placeholder="Full name" />
                <IconInput icon={Mail} error={errors.email} value={form.email} onChange={set('email')} placeholder="Email address" type="email" />
                <IconInput icon={Phone} error={errors.phone} value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" />

                <div className="flex gap-1.5 pt-0.5">
                  {INTENTS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, intent: opt }))}
                      className={`flex-1 rounded-lg border px-2 py-1.5 text-[12px] font-medium transition-colors ${
                        form.intent === opt ? 'border-[#8C6A57] bg-[#8C6A57] text-white' : 'border-black/15 text-[#5B5B5B] hover:bg-black/[0.03]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button type="submit" className="!mt-3.5 w-full rounded-xl bg-[#8C6A57] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#74543F] transition-colors">
                  Submit Request
                </button>
                <p className="text-center text-[10px] text-[#9a917f]">We'll only contact you about this project.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function IconInput({ icon: Icon, error, ...props }) {
  return (
    <div className="relative">
      <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5ab99]" />
      <input
        {...props}
        className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-1 ${
          error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' : 'border-black/10 focus:border-[#8C6A57] focus:ring-[#8C6A57]'
        }`}
      />
    </div>
  );
}
