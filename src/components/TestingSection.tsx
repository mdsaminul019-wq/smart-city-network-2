import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { TEST_COMMANDS } from '../data/networkData';
import { Terminal, CheckCircle2, Copy, Check } from 'lucide-react';

export const TestingSection: React.FC = () => {
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCommand = async (cmd: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section id="testing" className="space-y-6">
      <SectionTitle
        number="09"
        title="Network Verification & Testing"
        subtitle="Standard Cisco IOS diagnostic commands executed during Packet Tracer verification to validate topology convergence."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Command Selector List */}
        <div className="space-y-2.5">
          {TEST_COMMANDS.map((test, index) => {
            const isSelected = index === activeCommandIndex;
            return (
              <button
                key={test.command}
                onClick={() => setActiveCommandIndex(index)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#152347] border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                    : 'bg-[#0f1936] border-slate-800 hover:border-slate-700 hover:bg-[#121d3e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm font-bold text-cyan-300">
                    {test.command}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    TEST {index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {test.purpose}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right 2 Columns: Active Terminal Output Viewer */}
        <div className="lg:col-span-2 rounded-3xl bg-[#080e1c] border border-cyan-800/60 overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            {/* Terminal Top Bar */}
            <div className="p-4 sm:p-5 bg-[#0e172e] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="h-4 w-px bg-slate-700" />
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Router# {TEST_COMMANDS[activeCommandIndex].command}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyCommand(
                    TEST_COMMANDS[activeCommandIndex].command,
                    activeCommandIndex
                  )
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#131d38] hover:bg-cyan-950 text-cyan-300 border border-slate-700 text-xs cursor-pointer transition-colors"
                title="Copy Command"
              >
                {copiedIndex === activeCommandIndex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="text-cyan-400 font-semibold mb-3">
                # Executing: {TEST_COMMANDS[activeCommandIndex].command}
              </div>
              <pre className="text-emerald-300/90 whitespace-pre leading-relaxed select-all">
                {TEST_COMMANDS[activeCommandIndex].expectedOutput}
              </pre>
            </div>
          </div>

          {/* Validation Analysis Box */}
          <div className="p-5 bg-[#0a1224] border-t border-slate-800">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Expected Result & Verification
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {TEST_COMMANDS[activeCommandIndex].purpose}
                </p>
                <p className="text-xs text-cyan-300 mt-2 font-mono">
                  Analysis: {TEST_COMMANDS[activeCommandIndex].keyVerification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
