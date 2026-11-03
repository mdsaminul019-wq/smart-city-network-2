import React from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  number,
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-[#00E5FF] tracking-wider">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-1.5 text-sm text-slate-400 font-normal leading-relaxed pl-1">
          {subtitle}
        </p>
      )}
      <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full" />
    </div>
  );
};
