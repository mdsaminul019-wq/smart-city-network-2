import React from 'react';
import { SectionTitle } from './SectionTitle';
import { ShieldCheck, TrendingUp, Lock, Key, WifiOff, PlusCircle, Network, Layers } from 'lucide-react';

export const SecurityScalabilitySection: React.FC = () => {
  const SECURITY_POINTS = [
    {
      title: 'Limit Guest Wi-Fi via Access Control Lists (ACLs)',
      description: 'Standard and Extended IP ACLs block guest visitors from pinging or reaching municipal server clusters and hospital telemetry while permitting outbound Internet access.',
      icon: <WifiOff className="w-5 h-5" />,
      rule: 'access-list 101 deny ip 10.20.30.0 0.0.0.255 10.10.0.0 0.0.255.255'
    },
    {
      title: 'Protect the Dedicated Management VLAN',
      description: 'Network switches and routers have their management IPs located on isolated VLAN 99/199/299. No user devices or IoT terminals can initiate packets into this administrative plane.',
      icon: <Lock className="w-5 h-5" />,
      rule: 'Isolated VLAN 99/199/299 with strict ingress port access'
    },
    {
      title: 'Mandate Encrypted SSH v2 over Cleartext Telnet',
      description: 'Telnet transmits passwords and configuration in unencrypted plain text. Enabling crypto key generate rsa and transport input ssh guarantees that administrative credentials cannot be sniffed on trunks.',
      icon: <Key className="w-5 h-5" />,
      rule: 'crypto key generate rsa modulus 2048 / ip ssh version 2'
    }
  ];

  const SCALABILITY_POINTS = [
    {
      title: 'Add More VLANs When Needed',
      description: 'The Class-A hierarchical subnetting scheme allows network engineers to provision new departmental VLANs (e.g. VLAN 40, VLAN 50) without redesigning the core IP addressing layout.',
      icon: <PlusCircle className="w-5 h-5" />,
      benefit: 'Non-disruptive capacity growth'
    },
    {
      title: 'Add New City Locations Easily',
      description: 'New government sectors (such as a Smart Airport or Education Campus) can be integrated by assigning the next /16 block (10.50.0.0/16) and attaching to the central Metro Ethernet WAN with OSPF.',
      icon: <Network className="w-5 h-5" />,
      benefit: 'Plug-and-play geographic expansion'
    },
    {
      title: 'Add Redundant WAN Links for Reliability',
      description: 'Redundant point-to-point fiber runs between locations eliminate single points of failure. OSPF dynamic cost metrics automatically balance load and reroute around fiber cuts with zero downtime.',
      icon: <Layers className="w-5 h-5" />,
      benefit: 'High-availability 99.999% uptime'
    }
  ];

  return (
    <section id="security-scalability" className="space-y-6">
      <SectionTitle
        number="10"
        title="Security & Scalability Strategies"
        subtitle="Best practices ensuring the smart city remains protected against cyber threats while smoothly accommodating municipal expansion."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Pillar */}
        <div className="rounded-3xl bg-[#0f1936] border border-cyan-800/40 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-700/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Network Security Hardening</h3>
                <p className="text-xs text-slate-400">Guarding municipal and healthcare confidentiality</p>
              </div>
            </div>

            <div className="space-y-5">
              {SECURITY_POINTS.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span className="text-cyan-400">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {item.description}
                  </p>
                  <div className="pl-7 mt-1">
                    <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#091124] text-cyan-300 border border-slate-800">
                      {item.rule}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scalability Pillar */}
        <div className="rounded-3xl bg-[#0f1936] border border-slate-800 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-700/50">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Long-Term Scalability</h3>
                <p className="text-xs text-slate-400">Future-proof architecture for urban population growth</p>
              </div>
            </div>

            <div className="space-y-5">
              {SCALABILITY_POINTS.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span className="text-cyan-400">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {item.description}
                  </p>
                  <div className="pl-7 mt-1">
                    <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#091124] text-emerald-300 border border-slate-800">
                      ✓ {item.benefit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
