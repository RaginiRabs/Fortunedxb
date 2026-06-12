// Unit Specifications — distribution bar + responsive specs table. prototype1 ONLY. Mock.
import Money from './Money';

function DistributionBar({ distribution }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {distribution.map((d) => (
          <div
            key={d.id}
            style={{ width: `${d.percent}%`, backgroundColor: d.color }}
            title={`${d.label} ${d.percent}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {distribution.map((d) => (
          <span key={d.id} className="inline-flex items-center gap-1.5 text-[12px] text-[#5B5B5B]">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
            {d.label} | {d.percent}%
          </span>
        ))}
      </div>
    </div>
  );
}

export default function UnitSpecifications({ distribution, specs }) {
  return (
    <section id="specifications" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Unit Specifications</h2>

      <div className="mt-5">
        <DistributionBar distribution={distribution} />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-[#9a917f]">
                <th className="px-5 py-3 font-medium">Beds</th>
                <th className="px-5 py-3 font-medium">Sizes <span className="lowercase tracking-normal">(sqft)</span></th>
                <th className="px-5 py-3 font-medium">Avg price</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Units</th>
                <th className="px-5 py-3 font-medium">Availability</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((s) => (
                <tr key={s.beds} className="border-t border-black/[0.05]">
                  <td className="px-5 py-4 font-medium text-[#1A1A1A]">{s.beds}</td>
                  <td className="px-5 py-4 text-[#5B5B5B]">{s.sizes}</td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-[#1A1A1A]"><Money>{s.avgPrice}</Money></span>
                    <span className="block text-[12px] text-[#9a917f]"><Money>{s.perSqft}</Money></span>
                  </td>
                  <td className="px-5 py-4 text-[#5B5B5B]">{s.type}</td>
                  <td className="px-5 py-4 text-[#5B5B5B]">{s.units}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#E7F2EC] px-2.5 py-1 text-[12px] font-medium text-[#1F8A5B]">
                      {s.available}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
