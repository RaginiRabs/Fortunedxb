// New UAE Dirham currency symbol (2025) — inline SVG, inherits text color.
// prototype5 ONLY. Used in place of the "AED" text before amounts.
export default function Dirham({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Dirham"
      role="img"
      className={`inline-block h-[0.82em] w-[0.82em] -translate-y-[0.06em] ${className}`}
    >
      {/* D letterform (ring via even-odd) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3H11C16 3 19 7 19 12C19 17 16 21 11 21H5V3ZM8 6V18H11C14 18 16 15 16 12C16 9 14 6 11 6H8Z"
      />
      {/* two horizontal strokes crossing the stem */}
      <rect x="2.4" y="9" width="14.2" height="1.8" rx="0.9" />
      <rect x="2.4" y="12.6" width="14.2" height="1.8" rx="0.9" />
    </svg>
  );
}
