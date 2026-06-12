// prototype1 market insights — colored stat tiles with sparklines. Mock only.
import { ArrowRight, TrendingUp, LineChart, Flame } from 'lucide-react';
import { marketInsights } from '@/mock/prototype1/home';

const TONES = [
  { icon: TrendingUp, color: '#B89149', bg: 'from-[#B89149]/12 to-transparent' },
  { icon: LineChart, color: '#0E9F6E', bg: 'from-emerald-500/12 to-transparent' },
  { icon: Flame, color: '#B89149', bg: 'from-[#B89149]/12 to-transparent' },
];

function Sparkline({ color }) {
  return (
    <svg viewBox="0 0 120 40" className="mt-3 h-12 w-full" preserveAspectRatio="none">
      <polyline
        points="0,32 15,28 30,30 45,20 60,24 75,12 90,16 105,6 120,10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MarketInsights() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_14px_40px_-14px_rgba(20,18,15,0.22)]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B89149]">Live Data</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Market Insights</h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-[#B89149]/40 bg-white px-4 py-2 text-sm text-[#B89149] transition-colors hover:bg-[#B89149] hover:text-white"
        >
          Report <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {marketInsights.map((m, i) => {
          const tone = TONES[i] || TONES[0];
          const Icon = tone.icon;
          return (
            <div
              key={m.id}
              className={`rounded-2xl border border-gray-100 bg-gradient-to-br ${tone.bg} p-4 shadow-[0_8px_24px_-12px_rgba(20,18,15,0.18)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(184,145,73,0.32)]`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{m.label}</p>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white shadow-sm" style={{ color: tone.color }}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold" style={{ color: tone.color }}>
                {m.value}
              </p>
              <p className="text-xs text-gray-400">{m.sub}</p>
              <Sparkline color={tone.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
