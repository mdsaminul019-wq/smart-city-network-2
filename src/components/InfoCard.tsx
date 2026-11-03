import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  children,
  highlight = false,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-[#131d38]/85 p-5 sm:p-6 ${
        highlight
          ? 'border-[#00E5FF]/50 shadow-lg shadow-[#00E5FF]/10'
          : 'border-slate-800 hover:border-slate-700'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-[#00E5FF] shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#091124] text-cyan-300 border border-slate-800 shrink-0">
            {badge}
          </span>
        )}
      </div>
      <div className="text-sm text-slate-300 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
};
