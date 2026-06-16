// Transactions — recent sales table. prototype5 ONLY. Mock.
import Money from './Money';

export default function Transactions({ transactions }) {
  return (
    <section id="transactions" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Transactions</h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-[#FBFAF7] text-left text-[11px] uppercase tracking-[0.14em] text-[#9a917f]">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Seller</th>
                <th className="px-5 py-3 font-medium">Beds</th>
                <th className="px-5 py-3 font-medium">Size</th>
                <th className="px-5 py-3 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t border-black/[0.05]">
                  <td className="px-5 py-3.5 text-[#5B5B5B]">{t.date}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex rounded-md bg-[#FCEEE3] px-2 py-0.5 text-[12px] font-medium text-[#C2570B]">
                      {t.seller}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[#3A3A3A]">{t.beds}</td>
                  <td className="px-5 py-3.5 text-[#5B5B5B]">{t.size}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-[#1A1A1A]"><Money>{t.price}</Money></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
