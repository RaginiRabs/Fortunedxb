// Fortune Realty L.L.C brand logo — SVG quatrefoil knot mark + wordmark.
// prototype1 ONLY. Wordmark uses currentColor; set text color on the parent.
export default function Logo({ className = '', showText = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="fortuneBronze" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C7A593" />
            <stop offset="0.5" stopColor="#8C6A57" />
            <stop offset="1" stopColor="#5F4434" />
          </linearGradient>
        </defs>
        {/* four interlaced loops forming the knot */}
        <g fill="none" stroke="url(#fortuneBronze)" strokeWidth="5" strokeLinecap="round">
          <circle cx="32" cy="21" r="11" />
          <circle cx="32" cy="43" r="11" />
          <circle cx="21" cy="32" r="11" />
          <circle cx="43" cy="32" r="11" />
        </g>
      </svg>
      {showText && (
        <span className="font-serif text-lg font-light leading-none tracking-wide">
          Fortune Realty <span className="text-[0.78em] opacity-75">L.L.C</span>
        </span>
      )}
    </span>
  );
}
