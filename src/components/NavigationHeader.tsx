import React from 'react';
import { Smartphone, Monitor, Code2, Network } from 'lucide-react';

interface NavigationHeaderProps {
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
  onOpenCodeModal: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  isMobileDeviceView,
  onToggleDeviceView,
  onOpenCodeModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 transition-all">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        className="flex items-center gap-2.5 text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap shrink-0 group"
      >
        <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
          <Network className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-white">Smart City Network</span>
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
        <a
          href="#overview"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          Overview
        </a>
        <a
          href="#objectives"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          Objectives
        </a>
        <a
          href="#topology"
          className="text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          Topology
        </a>
        <a
          href="#hierarchy"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          3-Tier Design
        </a>
        <a
          href="#addressing"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          Addressing
        </a>
        <a
          href="#configuration"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          Configs
        </a>
        <a
          href="#testing"
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          Testing
        </a>
      </nav>

      {/* Zone 3: Primary actions (Switch Android Simulator View + Code Viewer) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onToggleDeviceView}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            isMobileDeviceView
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
              : 'bg-[#111c38] text-cyan-300 border-slate-700 hover:border-cyan-500/60'
          }`}
          title="Toggle Android Device Frame Simulation"
        >
          {isMobileDeviceView ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Wide Presentation</span>
              <span className="sm:hidden">Full</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Android Phone Frame</span>
              <span className="sm:hidden">Mobile</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenCodeModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 hover:border-cyan-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          title="View Android Studio Jetpack Compose Code"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Kotlin Compose Code</span>
          <span className="md:hidden">Kotlin</span>
        </button>
      </div>
    </header>
  );
};
