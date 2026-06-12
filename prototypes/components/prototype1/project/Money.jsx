// UAE Dirham symbol (new 2025 mark) as an inline SVG + a <Money> helper that
// swaps the literal "AED" in any price string for the symbol. prototype1 ONLY.
// Pure component (no hooks) — usable in server and client components.

export function Aed({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline-block h-[0.85em] w-[0.7em] -translate-y-[0.03em] align-middle ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="AED"
    >
      {/* D stem + bowl */}
      <path d="M9 4 V20" />
      <path d="M9 4 H12.5 A7.5 7.5 0 0 1 12.5 20 H9" />
      {/* two horizontal strokes through the stem */}
      <path d="M4.5 10 H12.5" />
      <path d="M4.5 14 H12.5" />
    </svg>
  );
}

export default function Money({ children, className }) {
  const text = String(children ?? '');
  if (!text.includes('AED')) return <span className={className}>{text}</span>;

  const parts = text.split('AED');
  return (
    <span className={className}>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <Aed />}
          {p}
        </span>
      ))}
    </span>
  );
}
