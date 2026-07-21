import { Code, MessageSquare, Cpu, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingFeatures() {
  const cards = [
    {
      title: 'Coding practice',
      desc: 'Write solution algorithms live in Monaco editor while explaining logic out loud.',
      icon: <Code size={18} className="text-zinc-400" />,
      action: 'Try it out'
    },
    {
      title: 'Custom job tailoring',
      desc: 'Paste target JDs to get questions matched to the exact tech stack and seniority.',
      icon: <Cpu size={18} className="text-zinc-400" />,
      action: 'Try it out'
    },
    {
      title: 'Behavioral & STAR',
      desc: 'Practice STAR method answers out loud with conversational follow-up questions.',
      icon: <MessageSquare size={18} className="text-zinc-400" />,
      action: 'Try it out'
    },
    {
      title: 'Instant feedback',
      desc: 'Get a breakdown of technical accuracy, speech clarity, and actionable tips.',
      icon: <Activity size={18} className="text-zinc-400" />,
      action: 'Try it out'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-black text-center font-sans select-none border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/[0.04] bg-[#08080a] flex flex-col justify-between items-start text-left min-h-[190px]"
            >
              <div className="space-y-3.5">
                {/* Clean icon, no background box */}
                <div className="text-zinc-400 flex items-center justify-start">
                  {card.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white tracking-wide">{card.title}</h4>
                  <p className="text-[12px] text-zinc-400 font-normal leading-relaxed">{card.desc}</p>
                </div>
              </div>
              
              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center px-4 py-1.5 bg-[#121214] hover:bg-[#1c1c1e] border border-white/[0.08] text-[11px] font-bold text-gray-200 rounded-lg transition-colors duration-200 shadow-sm"
              >
                {card.action}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
