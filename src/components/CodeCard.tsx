import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeCardProps {
  title: string;
  category: string;
  description: string;
  code: string;
}

export const CodeCard: React.FC<CodeCardProps> = ({
  title,
  category,
  description,
  code
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0e172e] overflow-hidden flex flex-col justify-between shadow-md hover:border-slate-700 transition-colors">
      {/* Header bar */}
      <div className="px-4 py-3 bg-[#131d38] border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Terminal className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs font-semibold text-white tracking-wide">
              {title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {category}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              copied
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                : 'bg-cyan-950/80 hover:bg-cyan-900/80 text-[#00E5FF] border border-cyan-500/30'
            }`}
            title="Copy Cisco CLI configuration"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2.5 bg-[#0e172e] border-b border-slate-800/60 text-xs text-slate-400">
        {description}
      </div>

      {/* Code body */}
      <div className="p-4 bg-[#080d1b] overflow-x-auto text-xs sm:text-sm font-mono text-cyan-100">
        <pre className="leading-relaxed">
          {code.split('\n').map((line, idx) => (
            <div key={idx} className="table-row">
              <span className="table-cell pr-4 text-slate-600 select-none text-right font-mono text-xs w-6">
                {idx + 1}
              </span>
              <span className="table-cell">
                {formatCiscoSyntax(line)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

// Subtle syntax styling for Cisco commands
function formatCiscoSyntax(line: string) {
  if (line.startsWith('interface') || line.startsWith('vlan') || line.startsWith('router')) {
    return <span className="text-[#00E5FF] font-semibold">{line}</span>;
  }
  if (line.startsWith(' ip address') || line.startsWith(' network') || line.startsWith(' default-router')) {
    return (
      <span>
        <span className="text-amber-300">{line.slice(0, line.indexOf(' ', 2) !== -1 ? line.indexOf(' ', 2) : undefined)}</span>
        <span className="text-emerald-300">{line.slice(line.indexOf(' ', 2) !== -1 ? line.indexOf(' ', 2) : 0)}</span>
      </span>
    );
  }
  if (line.startsWith(' switchport') || line.startsWith(' encapsulation') || line.startsWith(' name')) {
    return <span className="text-sky-300">{line}</span>;
  }
  return <span className="text-slate-200">{line}</span>;
}
