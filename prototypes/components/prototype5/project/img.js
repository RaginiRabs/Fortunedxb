// Image extension resolver. Store paths WITHOUT an extension (e.g.
// "/images/one-by-nine/exterior") and these candidates are tried in order until
// one loads — so .webp / .jpg / .jpeg / .png / .avif all "just work".
export const IMG_EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

export function srcCandidates(base) {
  if (!base) return [];
  // already has an extension → use as-is
  if (/\.(webp|jpe?g|png|avif|gif)$/i.test(base)) return [base];
  return IMG_EXTS.map((e) => `${base}.${e}`);
}
