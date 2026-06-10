'use client';

// "Ready to make your move?" — dark intent banner (Buy / Sell / Rent).
// prototype1 ONLY. Mock — selecting an intent + Continue is a no-op.
import { useState } from 'react';
import { Banknote, Home, Key, ArrowRight, X } from 'lucide-react';

const INTENTS = [
  { id: 'buy', label: 'Buy', icon: Banknote },
  { id: 'sell', label: 'Sell', icon: Home },
  { id: 'rent', label: 'Rent', icon: Key },
];

export default function MoveCTA({ projectName }) {
  const [intent, setIntent] = useState('buy');
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1622] via-[#10243a] to-[#0c1622] p-7 md:p-10 text-white">
      <button
        type="button"
        onClick={() => setClosed(true)}
        className="absolute right-4 top-4 inline-flex items-center gap-1 text-[12px] text-white/50 hover:text-white transition-colors"
      >
        <X size={14} /> Close
      </button>

      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">Ready to make your move?</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
            You&apos;ve seen the numbers for {projectName}. Let&apos;s turn insights into action.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            {INTENTS.map((opt) => {
              const Icon = opt.icon;
              const active = intent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIntent(opt.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-colors ${
                    active
                      ? 'border-[#C7A593] bg-[#8C6A57]/30 text-white'
                      : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#8C6A57] px-5 py-3 text-sm font-semibold text-white hover:bg-[#74543F] transition-colors"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
