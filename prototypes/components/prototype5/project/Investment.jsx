// Investment — AED/sqft price-trend chart (project vs area) + ROI metric cards.
// Lightweight hand-built SVG chart (no chart library). prototype5 ONLY. Mock.
import { TrendingUp } from 'lucide-react';
import Money from './Money';

const W = 600;
const H = 230;
const PAD = { t: 16, r: 16, b: 28, l: 44 };

function buildChart(trends) {
  const { years, area, project } = trends;
  const all = [...area, ...project].filter((v) => v != null);
  const min = Math.floor(Math.min(...all) / 100) * 100 - 100;
  const max = Math.ceil(Math.max(...all) / 100) * 100 + 100;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const x = (i) => PAD.l + (innerW * i) / (years.length - 1);
  const y = (v) => PAD.t + innerH - (innerH * (v - min)) / (max - min);

  const line = (series) =>
    series
      .map((v, i) => (v == null ? null : `${x(i)},${y(v)}`))
      .filter(Boolean)
      .map((p, idx) => (idx === 0 ? `M${p}` : `L${p}`))
      .join(' ');

  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) * i) / ticks);

  return { x, y, line, yTicks, years, area, project, innerW };
}

export default function Investment({ investment }) {
  const c = buildChart(investment.priceTrends);

  return (
    <section id="investment" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Investment Insights</h2>

      {/* ROI cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {investment.roi.map((r) => (
          <div key={r.label} className="rounded-2xl border border-black/[0.06] bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#9a917f]">{r.label}</p>
            <p className="mt-1 text-xl font-semibold text-[#1A1A1A]"><Money>{r.value}</Money></p>
            <p className="mt-1 text-[12px] text-[#9a917f]">{r.hint}</p>
          </div>
        ))}
      </div>

      {/* Price trend chart */}
      <div className="mt-4 rounded-2xl border border-black/[0.06] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A]">
            <TrendingUp size={16} className="text-[#16A34A]" />
            Price Trend — AED / sqft
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[#5B5B5B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B0905E]" /> One By Nine
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" /> Nad Al Sheba (area)
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label="Price trend chart">
          {/* gridlines + y labels */}
          {c.yTicks.map((t, i) => {
            const yy = c.y(t);
            return (
              <g key={i}>
                <line x1={PAD.l} x2={W - PAD.r} y1={yy} y2={yy} stroke="#000" strokeOpacity="0.06" />
                <text x={PAD.l - 8} y={yy + 3} textAnchor="end" fontSize="10" fill="#9a917f">
                  {Math.round(t)}
                </text>
              </g>
            );
          })}
          {/* x labels */}
          {c.years.map((yr, i) => (
            <text key={yr} x={c.x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9a917f">
              {yr}
            </text>
          ))}
          {/* area line */}
          <path d={c.line(c.area)} fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinejoin="round" />
          {c.area.map((v, i) => v != null && <circle key={i} cx={c.x(i)} cy={c.y(v)} r="3" fill="#94A3B8" />)}
          {/* project line */}
          <path d={c.line(c.project)} fill="none" stroke="#B0905E" strokeWidth="3" strokeLinejoin="round" />
          {c.project.map((v, i) => v != null && <circle key={i} cx={c.x(i)} cy={c.y(v)} r="3.5" fill="#B0905E" />)}
        </svg>
        <p className="mt-1 text-[11px] text-[#9a917f]">Indicative figures for illustration (mock data).</p>
      </div>
    </section>
  );
}
