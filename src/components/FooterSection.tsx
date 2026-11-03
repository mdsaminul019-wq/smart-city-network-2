import React from 'react';
import { GraduationCap, Network } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="mt-16 pt-10 pb-12 border-t border-slate-800 text-center space-y-5">
      <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-lg tracking-tight">
        <Network className="w-5 h-5 text-cyan-400" />
        <span>Smart City Network PBL</span>
      </div>

      <div className="max-w-md mx-auto space-y-1.5 text-xs text-slate-400">
        <div className="flex items-center justify-center gap-2 text-slate-200 font-semibold text-sm">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Brainware University</span>
        </div>
        <p>Project Based Learning (PBL) Seminar Presentation</p>
        <p className="text-slate-500">
          Design and Simulation of a Smart City Communication Network
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/60 max-w-xs mx-auto flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
        <span>Offline Simulation Mode</span>
        <span>·</span>
        <span>Cisco IOS Compatible</span>
      </div>
    </footer>
  );
};
