import React from 'react';
import { PresenterDetails } from '../types/network';
import { ArrowDown, Network, User, Building2, GraduationCap, Award, Sparkles, RotateCcw } from 'lucide-react';

interface HeroSectionProps {
  presenter: PresenterDetails;
  onChangePresenter: (details: Partial<PresenterDetails>) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  presenter,
  onChangePresenter,
  onExploreClick
}) => {
  const handleLoadDefaults = () => {
    onChangePresenter({
      studentName: 'Ronny Mukherjee & Team',
      department: 'Dept. of Computer Science & Engineering',
      collegeName: 'Brainware University',
      guideName: 'Prof. Debashis Roy'
    });
  };

  const handleClear = () => {
    onChangePresenter({
      studentName: '',
      department: '',
      collegeName: '',
      guideName: ''
    });
  };

  return (
    <section className="relative rounded-2xl bg-gradient-to-b from-[#101b38] via-[#0d162e] to-[#070c18] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Academic Project Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[#00E5FF] text-xs font-mono font-semibold mb-5">
          <Network className="w-3.5 h-3.5" />
          <span>College Project Based Learning (PBL) Presentation</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
          Design and Simulation of a Smart City Communication Network
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Hierarchical Network Design using VLANs, Inter VLAN Routing, OSPF and DHCP
        </p>

        {/* Editable Presentation Placeholders Card */}
        <div className="mt-8 text-left p-5 sm:p-6 rounded-xl bg-[#131d38]/90 border border-slate-700/80 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] font-semibold">
              <Award className="w-4 h-4" />
              <span>PRESENTER & PROJECT CREDENTIALS (LIVE EDITABLE)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadDefaults}
                className="text-[11px] font-mono text-slate-300 hover:text-[#00E5FF] flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800"
                title="Fill with sample Brainware University credentials"
              >
                <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                <span>Sample Data</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800"
                title="Clear all fields"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Student Name</span>
              </label>
              <input
                type="text"
                value={presenter.studentName}
                onChange={(e) => onChangePresenter({ studentName: e.target.value })}
                placeholder="Enter Student Name..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0a1122] border border-slate-700 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-sm text-white placeholder-slate-500 transition-colors font-medium outline-none"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Department</span>
              </label>
              <input
                type="text"
                value={presenter.department}
                onChange={(e) => onChangePresenter({ department: e.target.value })}
                placeholder="Enter Department (e.g. Computer Science)..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0a1122] border border-slate-700 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-sm text-white placeholder-slate-500 transition-colors font-medium outline-none"
              />
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>College Name</span>
              </label>
              <input
                type="text"
                value={presenter.collegeName}
                onChange={(e) => onChangePresenter({ collegeName: e.target.value })}
                placeholder="Enter College Name (e.g. Brainware University)..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0a1122] border border-slate-700 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-sm text-white placeholder-slate-500 transition-colors font-medium outline-none"
              />
            </div>

            {/* Guide Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Guide / Faculty Name</span>
              </label>
              <input
                type="text"
                value={presenter.guideName}
                onChange={(e) => onChangePresenter({ guideName: e.target.value })}
                placeholder="Enter Project Guide Name..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0a1122] border border-slate-700 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-sm text-white placeholder-slate-500 transition-colors font-medium outline-none"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <span>Explore Network Design</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
