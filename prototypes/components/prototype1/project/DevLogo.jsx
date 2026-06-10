'use client';

// Developer logo tile — logo image (any extension) on a dark square, falls back
// to initials if no image is found. prototype1 ONLY. Mock.
import SmartImg from './SmartImg';

export default function DevLogo({ src, name, className = 'h-12 w-12' }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1A1A1A] ${className}`}>
      <SmartImg
        base={src}
        alt={name}
        className="h-[62%] w-[62%] object-contain"
        onAllFail={<span className="text-sm font-semibold text-white">{initials}</span>}
      />
    </div>
  );
}
