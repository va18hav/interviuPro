import { useState } from 'react';
import { Code, Network, MessageSquare, Terminal, Check } from 'lucide-react';

type TabType = 'coding' | 'system' | 'behavioral';

export default function LandingProductTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('coding');

  const tabData = {
    coding: {
      title: 'Coding Practice Rounds',
      desc: 'Solve algorithm problems in a live Monaco editor while talking through your solution out loud.',
      bullets: [
        'Built-in Monaco editor supporting TypeScript, Python, Go, and C++',
        'Live feedback on time & space complexity as you explain logic',
        'Voice follow-ups when you miss edge cases or key constraints',
        'Real-time syntax validation before running your solution'
      ],
      visual: (
        <div className="w-full border border-white/5 bg-[#050505] rounded-xl overflow-hidden shadow-2xl animate-fade-in font-mono text-[11px] text-gray-400">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0F0F0F]">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">solution.ts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">SYNCED</span>
            </div>
          </div>
          {/* Editor mockup */}
          <div className="p-5 text-left space-y-2">
            <div><span className="text-emerald-400">export function</span> <span className="text-blue-400">solveUnique</span>(input: <span className="text-purple-400">string</span>) &#123;</div>
            <div className="pl-4"><span className="text-[#00E599] font-bold">// AI evaluates your approach as you write</span></div>
            <div className="pl-4"><span className="text-emerald-400">const</span> <span className="text-gray-200">seen</span> = <span className="text-emerald-400">new</span> <span className="text-purple-400">Set</span>();</div>
            <div className="pl-4"><span className="text-emerald-400">return</span> input.split(<span className="text-amber-400">''</span>).filter(c =&gt; !seen.has(c));</div>
            <div>&#125;</div>
          </div>
        </div>
      )
    },
    system: {
      title: 'System Design Sessions',
      desc: 'Tackle architecture questions, database choices, and distributed system trade-offs.',
      bullets: [
        'Practice architectural trade-offs: load balancing, caching, and databases',
        'Explain scaling choices out loud while the AI asks about bottlenecks',
        'Get feedback on single points of failure and replica strategies',
        'Tailor design complexity to your target engineering level'
      ],
      visual: (
        <div className="w-full border border-white/5 bg-[#050505] rounded-xl p-5 shadow-2xl animate-fade-in text-left space-y-4 font-mono">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 block">System Architecture</span>
          
          <div className="flex flex-col gap-2.5">
            <div className="p-3 border border-white/5 bg-[#0F0F0F] rounded-lg text-center font-bold text-[10px] uppercase text-gray-300">
              Load Balancer (Nginx)
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 p-3 border border-emerald-500/20 bg-emerald-950/5 rounded-lg text-center font-bold text-[10px] uppercase text-[#00E599]">
                Server Node A
              </div>
              <div className="flex-1 p-3 border border-white/5 bg-[#0F0F0F] rounded-lg text-center font-bold text-[10px] uppercase text-gray-400">
                Server Node B
              </div>
            </div>

            <div className="p-3 border border-purple-500/20 bg-purple-950/5 rounded-lg text-center font-bold text-[10px] uppercase text-purple-300">
              Redis Cluster (Cache Layer)
            </div>
          </div>
        </div>
      )
    },
    behavioral: {
      title: 'Behavioral STAR Rounds',
      desc: 'Practice articulating past engineering experiences using the STAR method out loud.',
      bullets: [
        'Structure past experiences using Situation, Task, Action, and Result',
        'Practice delivery and concise verbal explanations',
        'Get AI feedback on clarity, impact, and STAR completeness',
        'Review transcripts with key highlights after every session'
      ],
      visual: (
        <div className="w-full border border-white/5 bg-[#050505] rounded-xl p-5 shadow-2xl animate-fade-in text-left space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Session Feedback</span>
            <span className="text-[9px] font-mono font-bold text-[#00E599] bg-[#00E599]/5 px-2 py-0.5 rounded border border-[#00E599]/20 uppercase">Complete</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg border border-white/5 bg-[#0F0F0F]/60 text-xs text-gray-300">
              <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">YOU SAID:</span>
              "I led a database migration project to reduce API query overhead by 40%..."
            </div>
            
            <div className="p-3 rounded-lg border border-emerald-500/10 bg-emerald-950/5 text-xs text-[#00E599]">
              <span className="text-[9px] font-mono text-emerald-500/80 font-bold block mb-1">AI FEEDBACK:</span>
              "Clear STAR structure. Great focus on quantifiable metrics and team execution."
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="py-24 px-6 bg-black text-center font-sans select-none border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Toggle tabs button group */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl border border-white/5 bg-zinc-950/40">
            {(['coding', 'system', 'behavioral'] as TabType[]).map((tab) => {
              const active = activeTab === tab;
              const labels = {
                coding: { text: 'Coding Mocks', icon: <Code size={14} /> },
                system: { text: 'System Design', icon: <Network size={14} /> },
                behavioral: { text: 'Behavioral STAR', icon: <MessageSquare size={14} /> }
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                    active
                      ? 'border border-[#00E599]/30 bg-black text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.1)]'
                      : 'text-gray-500 hover:text-white border border-transparent'
                  }`}
                >
                  {labels[tab].icon}
                  <span>{labels[tab].text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center text-left">
          {/* Details (Left) */}
          <div className="md:col-span-6 space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {tabData[activeTab].title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-normal">
              {tabData[activeTab].desc}
            </p>
            <ul className="space-y-3 pt-2">
              {tabData[activeTab].bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 font-normal">
                  <Check size={14} className="text-[#00E599] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Showcase (Right) */}
          <div className="md:col-span-6 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#00E599]/5 rounded-xl blur-3xl pointer-events-none" />
            <div className="w-full relative z-10">
              {tabData[activeTab].visual}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
