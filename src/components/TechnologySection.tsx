import React from 'react';
import { SectionTitle } from './SectionTitle';
import { Network, GitBranch, Cpu, Server } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const TECHS = [
    {
      id: 'vlans',
      title: 'VLANs (IEEE 802.1Q)',
      category: 'Layer 2 Logical Segmentation',
      icon: <Network className="w-6 h-6" />,
      description: 'Breaks large broadcast domains into isolated broadcast containers within the same physical switch infrastructure.',
      details: [
        'Inserts a 4-byte 802.1Q tag into Ethernet frames.',
        'Prevents broadcast storms from hospital IoT from leaking into emergency dispatch.',
        'Enables dedicated security enforcement at the switch port level.'
      ],
      standard: 'IEEE 802.1Q'
    },
    {
      id: 'roas',
      title: 'Router-on-a-Stick (ROAS)',
      category: 'Inter-VLAN Gateway Routing',
      icon: <GitBranch className="w-6 h-6" />,
      description: 'Uses a single physical router GigabitEthernet link configured with multiple logical subinterfaces to route between VLANs.',
      details: [
        'Each subinterface handles one VLAN ID (e.g., Gi0/0.10 for VLAN 10).',
        'Applies encapsulation dot1Q to tag and untag ingress/egress packets.',
        'Economical design eliminating the need for expensive multi-port router cards.'
      ],
      standard: '802.1Q Subinterfaces'
    },
    {
      id: 'ospf',
      title: 'OSPF (Open Shortest Path First)',
      category: 'Dynamic Link-State Routing',
      icon: <Cpu className="w-6 h-6" />,
      description: 'Interior Gateway Protocol using Dijkstra algorithm to compute the shortest loop-free path across the smart city WAN backbone.',
      details: [
        'Forms neighbor adjacencies via multicast (224.0.0.5).',
        'Single Backbone Area 0 minimizes SPF calculation overhead.',
        'Fast link failure detection with immediate alternate path convergence.'
      ],
      standard: 'RFC 2328 (OSPFv2)'
    },
    {
      id: 'dhcp',
      title: 'DHCP (Dynamic Host Configuration)',
      category: 'Automated IP Allocation',
      icon: <Server className="w-6 h-6" />,
      description: 'Centralized IP management service that automatically leases network parameters to smart city endpoint clients.',
      details: [
        'Four-way DORA handshake (Discover, Offer, Request, Acknowledge).',
        'Assigns IP address, subnet mask, default gateway, and DNS servers.',
        'Reduces human configuration errors and eliminates IP address conflicts.'
      ],
      standard: 'RFC 2131'
    }
  ];

  return (
    <section id="technology" className="space-y-6">
      <SectionTitle
        number="07"
        title="Technology Used"
        subtitle="Core networking protocols and standards deployed to establish the smart city communication mesh."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECHS.map((tech) => (
          <div
            key={tech.id}
            className="rounded-3xl bg-[#0f1936] border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-7 transition-all duration-200 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400 flex items-center justify-center shrink-0">
                  {tech.icon}
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#091124] text-cyan-300 border border-slate-800">
                  {tech.standard}
                </span>
              </div>

              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {tech.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                {tech.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {tech.description}
              </p>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {tech.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 font-bold">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
