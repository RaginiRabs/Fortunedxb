'use client';

// "Register Your Interest" — button + lead-capture popup form. prototype1 ONLY.
// Mock: submit just shows a success state (no backend).
import { useEffect, useState } from 'react';
import { ChevronRight, X, Check, User, Mail, Phone } from 'lucide-react';

const INTENTS = ['Buy to live', 'Investment', 'Just exploring'];
const EMPTY = { name: '', email: '', phone: '', intent: 'Investment', message: '' };

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
    // reset shortly after closing so the form is fresh next time
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
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 7) errs.phone = 'Enter a valid phone';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#8C6A57] px-4 py-3 text-sm font-semibold text-white hover:bg-[#74543F] transition-colors"
      >
        Register Your Interest
        <ChevronRight size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm" onClick={close}>
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5">
              <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">Register Your Interest</h3>
                <p className="mt-0.5 text-[13px] text-[#8a8a8a]">
                  {done ? 'Thank you' : `Get pricing & availability for ${projectName}`}
                </p>
              </div>
              <button type="button" onClick={close} className="rounded-full p-1.5 text-[#6B6B6B] hover:bg-black/[0.05]">
                <X size={20} />
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F2EC] text-[#1F8A5B]">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <p className="text-base font-semibold text-[#1A1A1A]">Your request has been received</p>
                <p className="max-w-xs text-sm text-[#6B6B6B]">
                  Our team will reach out shortly with details for {projectName}.
                </p>
                <button type="button" onClick={close} className="mt-2 rounded-xl bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-black">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 px-6 py-5">
                <Field label="Full name" error={errors.name} icon={User}>
                  <input value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls(errors.name)} />
                </Field>
                <Field label="Email" error={errors.email} icon={Mail}>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={inputCls(errors.email)} />
                </Field>
                <Field label="Phone" error={errors.phone} icon={Phone}>
                  <input value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" className={inputCls(errors.phone)} />
                </Field>

                <div>
                  <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9a917f]">I'm interested in</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {INTENTS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, intent: opt }))}
                        className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                          form.intent === opt ? 'border-[#8C6A57] bg-[#8C6A57] text-white' : 'border-black/15 text-[#5B5B5B] hover:bg-black/[0.03]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9a917f]">Message (optional)</label>
                  <textarea value={form.message} onChange={set('message')} rows={3} placeholder="Anything specific you'd like to know?" className="mt-1.5 w-full resize-none rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#8C6A57] focus:ring-1 focus:ring-[#8C6A57]" />
                </div>

                <button type="submit" className="w-full rounded-xl bg-[#8C6A57] px-4 py-3 text-sm font-semibold text-white hover:bg-[#74543F] transition-colors">
                  Submit Request
                </button>
                <p className="text-center text-[11px] text-[#9a917f]">
                  By submitting you agree to be contacted about this project.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const inputCls = (err) =>
  `mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-1 ${
    err ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' : 'border-black/10 focus:border-[#8C6A57] focus:ring-[#8C6A57]'
  }`;

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9a917f]">{label}</label>
      {children}
      {error && <p className="mt-1 text-[12px] text-[#DC2626]">{error}</p>}
    </div>
  );
}
