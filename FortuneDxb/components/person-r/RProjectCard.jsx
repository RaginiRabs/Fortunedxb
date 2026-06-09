'use client';

// person-r component. Build freely here — only person-r imports this.

const RProjectCard = ({ project }) => {
  return (
    <article className="group border border-white/[0.08] bg-[#1b1714] overflow-hidden">
      <div className="aspect-[4/3] bg-white/[0.04] flex items-center justify-center text-white/30 text-xs uppercase tracking-widest">
        {project.area}
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#B0905E]">
          {project.developer}
        </p>
        <h3 className="mt-1 text-lg text-[#F5F2ED]">{project.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-white/60">
            From AED {project.price_from.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-wider border border-white/[0.12] px-2 py-1 text-white/70">
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default RProjectCard;
