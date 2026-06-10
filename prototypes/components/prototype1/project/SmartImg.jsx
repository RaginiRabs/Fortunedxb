'use client';

// <img> that tries every extension for a base path (and an optional fallback
// URL), then renders `onAllFail` if nothing loads. prototype1 ONLY.
//
// Handles the SSR race: the first candidate is server-rendered and may 404
// before React hydrates (so the early onError is missed). After mount we check
// whether the current image already failed (complete && naturalWidth === 0) and
// advance to the next candidate.
import { useEffect, useRef, useState } from 'react';
import { srcCandidates } from './img';

export default function SmartImg({ base, fallback, alt = '', className, onAllFail = null }) {
  const list = [...srcCandidates(base), ...(fallback ? [fallback] : [])];
  const [i, setI] = useState(0);
  const ref = useRef(null);

  const advance = () => setI((n) => n + 1);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) advance();
  }, [i]);

  if (i >= list.length) return onAllFail;

  return (
    <img
      ref={ref}
      src={list[i]}
      alt={alt}
      loading="lazy"
      className={className}
      onError={advance}
    />
  );
}
