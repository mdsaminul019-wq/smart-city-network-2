import React from 'react';
import { SectionTitle } from './SectionTitle';
import { LOCATIONS } from '../data/networkData';
import { Table, Network, Check } from 'lucide-react';

export const AddressingTableSection: React.FC = () => {
  return (
    <section id="addressing" className="space-y-6">
      <SectionTitle
        number="06"
        title="VLAN and IP Addressing Scheme"
        subtitle="Hierarchical Class-A IPv4 block allocation providing clear subnet boundaries and effortless summarization."
      />

      <div className="rounded-3xl bg-[#0f1936] border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              Municipal Subnet Matrix
            </h3>
          </div>
          <div className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            WAN Transit: 10.255.0.0/29 (Area 0)
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#091124] text-slate-300 font-mono text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-5">Location</th>
                <th className="py-4 px-5">VLANs</th>
                <th className="py-4 px-5">Management VLAN</th>
                <th className="py-4 px-5">Address Block</th>
                <th className="py-4 px-5 hidden md:table-cell">Subnet Mask</th>
                <th className="py-4 px-5 hidden lg:table-cell">OSPF Wildcard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {LOCATIONS.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5 font-sans font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span>{loc.name}</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      {loc.vlans.map((v) => (
                        <span
                          key={v}
                          className="px-2 py-0.5 rounded text-xs bg-[#152345] text-cyan-300 border border-cyan-800/50"
                        >
                          VLAN {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      VLAN {loc.managementVlan}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-cyan-400 text-sm">
                    {loc.addressBlock}
                  </td>
                  <td className="py-4 px-5 text-slate-400 hidden md:table-cell">
                    255.255.0.0
                  </td>
                  <td className="py-4 px-5 text-slate-400 hidden lg:table-cell">
                    0.0.255.255
                  </td>
                </tr>
              ))}

              <tr className="bg-cyan-950/20 font-mono">
                <td className="py-4 px-5 font-sans font-bold text-cyan-300 flex items-center gap-2">
                  <Network className="w-4 h-4 text-cyan-400" />
                  <span>Metro Ethernet Transit WAN</span>
                </td>
                <td className="py-4 px-5 text-slate-400 font-sans">
                  Point-to-Multipoint Core
                </td>
                <td className="py-4 px-5 text-slate-400">
                  Native 1
                </td>
                <td className="py-4 px-5 font-bold text-emerald-400 text-sm">
                  10.255.0.0/29
                </td>
                <td className="py-4 px-5 text-slate-400 hidden md:table-cell">
                  255.255.255.248
                </td>
                <td className="py-4 px-5 text-slate-400 hidden lg:table-cell">
                  0.0.0.7
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>* Each location is allocated a /16 block, partitioned into /24 subnets (254 usable IPs per VLAN).</span>
          <span className="font-mono text-cyan-400 font-semibold">Summarization: 10.0.0.0/8</span>
        </div>
      </div>
    </section>
  );
};
