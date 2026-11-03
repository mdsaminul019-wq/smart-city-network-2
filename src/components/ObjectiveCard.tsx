import React from 'react';
import { Layers, Network, GitBranch, Cpu, Server } from 'lucide-react';

interface ObjectiveCardProps {
  id?: string;
  index?: number;
  title: string;
  category?: string;
  description: string;
  protocolBadge: string;
  keyBenefit?: string;
  keyFeature?: string;
  icon?: React.ReactNode;
}

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  hierarchy: <Layers className="w-5 h-5" />,
  vlan: <Network className="w-5 h-5" />,
  roas: <GitBranch className="w-5 h-5" />,
  ospf: <Cpu className="w-5 h-5" />,
  dhcp: <Server className="w-5 h-5" />,
};

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  id,
  index,
  title,
  category,
  description,
  protocolBadge,
  keyBenefit,
  keyFeature,
  icon,
}) => {
  const displayIcon = icon || (id ? DEFAULT_ICONS[id] : <Network className="w-5 h-5" />);
  const benefitText = keyBenefit || keyFeature || 'Core Protocol';

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-[#131d38]/90 p-5 hover:border-[#00E5FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-950/40 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-[#00E5FF] group-hover:scale-105 transition-transform">
              {displayIcon}
            </div>
            {category ? (
              <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                {category}
              </span>
            ) : index !== undefined ? (
              <span className="font-mono text-xs text-slate-400 font-semibold">
                OBJ 0{index}
              </span>
            ) : null}
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#182444] border border-cyan-500/20 text-[#00E5FF] font-medium">
            {protocolBadge}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="text-slate-400">Core Impact</span>
        <span className="text-[#38BDF8] font-semibold">{benefitText}</span>
      </div>
    </div>
  );
};
