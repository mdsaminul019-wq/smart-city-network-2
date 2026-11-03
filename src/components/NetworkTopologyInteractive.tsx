import React, { useState } from 'react';
import { LOCATIONS } from '../data/networkData';
import { NetworkLocation } from '../types/network';
import { TopologyLocationCard } from './TopologyLocationCard';
import { Network, Globe, Radio, Play, CheckCircle2, ArrowRightLeft, Layers, ShieldCheck } from 'lucide-react';

export const NetworkTopologyInteractive: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<NetworkLocation>(LOCATIONS[0]);
  const [isSimulatingPacket, setIsSimulatingPacket] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const handleSimulatePing = (targetLoc: NetworkLocation) => {
    setIsSimulatingPacket(true);
    setSimulationLog(`Pinging ${targetLoc.name} (${targetLoc.routerName}) via WAN 10.255.0.0/29...`);
    
    setTimeout(() => {
      setSimulationLog(`OSPF Area 0 shortest path calculated via cost metric 10. 5 ICMP echo packets transmitted with 0% packet loss!`);
      setTimeout(() => {
        setIsSimulatingPacket(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Simulation banner / controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#131d38] border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span>Interactive OSPF Area 0 Backbone & 4 Municipal Edge Nodes</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulatePing(selectedLocation)}
            disabled={isSimulatingPacket}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E5FF] hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulatingPacket ? 'Simulating Transit...' : `Send Packet to ${selectedLocation.routerName}`}</span>
          </button>
        </div>
      </div>

      {simulationLog && (
        <div className="p-3 rounded-lg bg-cyan-950/40 border border-[#00E5FF]/40 text-xs text-[#00E5FF] font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00E5FF]" />
          <span>{simulationLog}</span>
        </div>
      )}

      {/* Grid of the 4 nodes around the Central Metro Ethernet WAN */}
      <div className="relative rounded-2xl border border-slate-800 bg-[#0a1020] p-4 sm:p-6 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#131d380f_1px,transparent_1px),linear-gradient(to_bottom,#131d380f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Central WAN Card */}
        <div className="mb-6 mx-auto max-w-xl text-center relative z-10">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-indigo-500/30">
            <div className="rounded-xl bg-[#14203d] border-2 border-[#00E5FF]/50 p-4 sm:p-5 shadow-xl shadow-cyan-950/50">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Globe className="w-5 h-5 text-[#00E5FF]" />
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-bold">
                  Central Backbone Hub
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Metro Ethernet WAN
              </h3>
              
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs">
                <div className="px-2.5 py-1 rounded bg-[#0b1329] border border-cyan-500/40 text-[#00E5FF]">
                  WAN Transit: <strong className="text-white">10.255.0.0/29</strong>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#0b1329] border border-cyan-500/40 text-[#00E5FF]">
                  Routing Domain: <strong className="text-white">OSPF Area 0</strong>
                </div>
              </div>

              <div className="mt-2.5 text-[11px] text-slate-400">
                Full mesh backbone forwarding point-to-point transit traffic between all 4 city districts
              </div>
            </div>
          </div>

          {/* Animated connection lines visualization */}
          <div className="hidden sm:flex justify-around items-center h-8 relative max-w-md mx-auto">
            <div className={`w-0.5 h-full ${isSimulatingPacket ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' : 'bg-slate-700'}`} />
            <div className={`w-0.5 h-full ${isSimulatingPacket ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' : 'bg-slate-700'}`} />
            <div className={`w-0.5 h-full ${isSimulatingPacket ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' : 'bg-slate-700'}`} />
            <div className={`w-0.5 h-full ${isSimulatingPacket ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' : 'bg-slate-700'}`} />
          </div>
        </div>

        {/* 4 Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {LOCATIONS.map((loc, idx) => (
            <TopologyLocationCard
              key={loc.id}
              location={loc}
              isSelected={selectedLocation.id === loc.id}
              onSelect={() => setSelectedLocation(loc)}
              positionLabel={`Node 0${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Selected Location Detail Inspector Card */}
      <div className="rounded-2xl border-2 border-cyan-500/40 bg-[#101932] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-[#00E5FF] font-semibold border border-cyan-500/30">
                ACTIVE NODE INSPECTION
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="font-mono text-xs text-slate-300">{selectedLocation.routerName}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {selectedLocation.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {selectedLocation.description}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 font-mono text-xs">
            <span className="text-slate-400">Assigned Address Block</span>
            <span className="text-base font-bold text-[#00E5FF] px-2.5 py-1 rounded bg-[#0b1329] border border-cyan-500/30">
              {selectedLocation.addressBlock}
            </span>
          </div>
        </div>

        {/* Node stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-[#0b1329] border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Edge Router</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">{selectedLocation.routerName}</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0b1329] border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Total VLANs</div>
            <div className="text-sm font-bold text-[#38BDF8] font-mono mt-0.5">{selectedLocation.vlans.length} VLANs</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0b1329] border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Mgmt VLAN</div>
            <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">VLAN {selectedLocation.managementVlan}</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0b1329] border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">OSPF Metric</div>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">Cost 10 (FastEthernet/Gig)</div>
          </div>
        </div>

        {/* Detailed VLAN list */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00E5FF]" />
            <span>Configured VLANs & Subnet Allocation for {selectedLocation.name}</span>
          </h4>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0b1329] text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">VLAN ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Subnet</th>
                  <th className="py-2.5 px-3">Default Gateway</th>
                  <th className="py-2.5 px-3">Usable Hosts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#0e172e]/60">
                {selectedLocation.vlanDetails.map((vlan) => (
                  <tr key={vlan.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        vlan.id === selectedLocation.managementVlan
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : 'bg-cyan-950/80 text-[#00E5FF] border border-cyan-500/30'
                      }`}>
                        VLAN {vlan.id}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">{vlan.name}</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">{vlan.purpose}</td>
                    <td className="py-2.5 px-3 text-cyan-300">{vlan.subnet}</td>
                    <td className="py-2.5 px-3 text-emerald-300">{vlan.gateway}</td>
                    <td className="py-2.5 px-3 text-slate-400">{vlan.usableHosts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
