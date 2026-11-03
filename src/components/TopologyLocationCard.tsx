import React from 'react';
import { NetworkLocation } from '../types/network';
import { Server, Activity, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

interface TopologyLocationCardProps {
  location: NetworkLocation;
  isSelected: boolean;
  onSelect: () => void;
  positionLabel: string;
}

export const TopologyLocationCard: React.FC<TopologyLocationCardProps> = ({
  location,
  isSelected,
  onSelect,
  positionLabel
}) => {
  const getIcon = () => {
    switch (location.id) {
      case 'cdc':
        return <Server className="w-5 h-5 text-[#00E5FF]" />;
      case 'hosp':
        return <Activity className="w-5 h-5 text-[#38BDF8]" />;
      case 'safety':
        return <ShieldAlert className="w-5 h-5 text-[#818CF8]" />;
      case 'traffic':
        return <Cpu className="w-5 h-5 text-[#06B6D4]" />;
      default:
        return <Server className="w-5 h-5 text-[#00E5FF]" />;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-xl p-4 sm:p-5 transition-all duration-300 border relative group cursor-pointer ${
        isSelected
          ? 'bg-[#182444] border-[#00E5FF] shadow-lg shadow-cyan-500/20 scale-[1.02]'
          : 'bg-[#131d38]/90 border-slate-800 hover:border-slate-600 hover:bg-[#182444]/70'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400">
              {positionLabel} · {location.routerName}
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
              {location.name}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
            isSelected
              ? 'bg-[#00E5FF] text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-700 text-[#38BDF8]'
          }`}>
            {location.addressBlock}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-300 line-clamp-2 mb-3">
        {location.description}
      </p>

      {/* VLAN preview chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-slate-400 mr-1 font-medium">VLANs:</span>
        {location.vlans.map((vlanId) => (
          <span
            key={vlanId}
            className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
              vlanId === location.managementVlan
                ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300'
                : 'bg-slate-900/80 border border-slate-700/80 text-slate-300'
            }`}
          >
            {vlanId}
            {vlanId === location.managementVlan ? ' (M)' : ''}
          </span>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">
          {isSelected ? 'Currently Inspected' : 'Click to inspect node details'}
        </span>
        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
          isSelected ? 'text-[#00E5FF] translate-x-1' : 'text-slate-500 group-hover:translate-x-0.5'
        }`} />
      </div>
    </button>
  );
};
