import React from 'react';
import { SectionTitle } from './SectionTitle';
import { HIERARCHICAL_LAYERS } from '../data/networkData';
import { Laptop, Cpu, Globe2, CheckCircle2 } from 'lucide-react';

const LAYER_ICONS: Record<string, React.ReactNode> = {
  'Access Layer': <Laptop className="w-6 h-6" />,
  'Distribution Layer': <Cpu className="w-6 h-6" />,
  'Core Layer': <Globe2 className="w-6 h-6" />,
};

export const HierarchySection: React.FC = () => {
  return (
    <section id="hierarchy" className="space-y-6">
      <SectionTitle
        number="05"
        title="Hierarchical Network Design"
        subtitle="The industry-standard Cisco 3-layer enterprise architecture that organizes the city's vast communication flow."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HIERARCHICAL_LAYERS.map((layer, index) => {
          const isCore = layer.name === 'Core Layer';
          return (
            <div
              key={layer.name}
              className={`rounded-2xl p-6 transition-all relative flex flex-col justify-between ${
                isCore
                  ? 'bg-gradient-to-b from-[#142247] to-[#0d1630] border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.15)]'
                  : 'bg-[#101934] border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isCore
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-cyan-950/70 border border-cyan-800/40 text-cyan-400'
                    }`}
                  >
                    {LAYER_ICONS[layer.name]}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                    LAYER 0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">{layer.name}</h3>
                <p className="text-xs font-semibold text-cyan-300 mt-0.5">{layer.role}</p>

                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {layer.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Key Features:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {layer.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <span>Equipment: </span>
                <span className="text-slate-200">{layer.equipment}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
